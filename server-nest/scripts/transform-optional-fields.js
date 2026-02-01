/**
 * Transform Postman collection to comment out optional fields
 *
 * This script reads the OpenAPI spec to determine which fields are required
 * vs optional for each endpoint's request body, then modifies the Postman
 * collection to comment out optional fields.
 *
 * Users can quickly uncomment fields in Postman when needed.
 * A pre-request script strips comments before sending requests.
 */
const fs = require('fs');
const path = require('path');

const OPENAPI_PATH = path.join(__dirname, '../docs/openapi.json');
const COLLECTION_PATH = path.join(__dirname, '../postman/collection.json');

/**
 * Fields that should use environment/collection variables instead of placeholder values.
 * - agentId, toolId: Auto-saved from previous API responses via Portman config
 * - email, password: From Postman environment (login credentials)
 * - name: Use timestamp for unique agent names in CI (prevents conflicts)
 * - content: Default message content for testing
 */
const FIELD_VARIABLES = {
  agentId: '{{agentId}}',
  toolId: '{{toolId}}',
  email: '{{login_email}}',
  password: '{{login_password}}',
  name: 'Test Agent {{$timestamp}}',
  content: 'Hello, this is a test message',
};

/**
 * URL path parameters that should use collection variables instead of <string>.
 * Maps OpenAPI path -> { paramName: variableValue }
 */
const PATH_VARIABLES = {
  '/api/agents/{id}': { id: '{{agentId}}' },
  '/api/agents/{id}/messages': { id: '{{agentId}}' },
  '/api/agents/{id}/messages/reset': { id: '{{agentId}}' },
  '/api/agents/{id}/blocks': { id: '{{agentId}}' },
  '/api/agents/{id}/blocks/{label}': { id: '{{agentId}}' },
  '/api/agents/{id}/tools': { id: '{{agentId}}' },
  '/api/agents/{id}/tools/{toolId}': { id: '{{agentId}}', toolId: '{{toolId}}' },
  '/api/agents/{id}/tools/{toolId}/attach': {
    id: '{{agentId}}',
    toolId: '{{toolId}}',
  },
  '/api/tools/{id}': { id: '{{toolId}}' },
};

/**
 * Build a map of schema name -> required fields array
 * Works with both $ref schemas and inline schemas
 */
function getRequiredFieldsMap(openapi) {
  const requiredMap = {};
  const schemas = openapi.components?.schemas || {};

  for (const [name, schema] of Object.entries(schemas)) {
    if (schema.required && Array.isArray(schema.required)) {
      requiredMap[name] = schema.required;
    }
  }
  return requiredMap;
}

/**
 * Build a map of "METHOD::/path" -> required fields for multipart/form-data endpoints
 */
function getFormDataSchemaMap(openapi) {
  const pathMap = {};
  const paths = openapi.paths || {};

  for (const [pathKey, pathItem] of Object.entries(paths)) {
    for (const method of ['post', 'put', 'patch']) {
      const operation = pathItem[method];
      if (!operation) continue;

      const schema =
        operation.requestBody?.content?.['multipart/form-data']?.schema;
      if (!schema) continue;

      const key = `${method.toUpperCase()}::${pathKey}`;
      pathMap[key] = {
        required: schema.required || [],
      };
    }
  }
  return pathMap;
}

/**
 * Build a map of "METHOD::/path" -> { schemaName, inlineSchema, examples }
 * Handles both $ref schemas and inline schemas (from oRPC)
 */
function getPathToSchemaMap(openapi) {
  const pathMap = {};
  const paths = openapi.paths || {};

  for (const [pathKey, pathItem] of Object.entries(paths)) {
    for (const method of ['post', 'put', 'patch']) {
      const operation = pathItem[method];
      if (!operation) continue;

      const schema =
        operation.requestBody?.content?.['application/json']?.schema;
      if (!schema) continue;

      const key = `${method.toUpperCase()}::${pathKey}`;

      if (schema.$ref) {
        // Reference to components/schemas
        const schemaName = schema.$ref.split('/').pop();
        pathMap[key] = { schemaName, inlineSchema: null, examples: null };
      } else {
        // Inline schema (oRPC style)
        const examples = schema.examples || [];
        const required = schema.required || [];
        pathMap[key] = {
          schemaName: null,
          inlineSchema: schema,
          required,
          examples,
        };
      }
    }
  }
  return pathMap;
}

/**
 * Convert Postman URL path array to OpenAPI path format
 * e.g., ["api", "agents", ":id"] -> "/api/agents/{id}"
 */
function postmanPathToOpenApiPath(pathArray) {
  if (!pathArray || pathArray.length === 0) return '/';

  const segments = pathArray.map((segment) => {
    // Convert Postman :param to OpenAPI {param}
    if (segment.startsWith(':')) {
      return `{${segment.slice(1)}}`;
    }
    return segment;
  });

  return '/' + segments.filter(Boolean).join('/');
}

/**
 * Transform URL path variables to use collection variables
 * e.g., { key: "id", value: "<string>" } -> { key: "id", value: "{{agentId}}" }
 */
function transformUrlVariables(item, openApiPath) {
  const pathConfig = PATH_VARIABLES[openApiPath];
  if (!pathConfig || !item.request?.url?.variable) return false;

  let transformed = false;
  item.request.url.variable.forEach((v) => {
    if (pathConfig[v.key] && v.value !== pathConfig[v.key]) {
      v.value = pathConfig[v.key];
      transformed = true;
    }
  });
  return transformed;
}

/**
 * Transform formdata fields:
 * 1. Disable optional fields (disabled: true)
 * 2. Replace placeholder values with collection variables
 */
function transformFormdata(formdata, requiredFields) {
  let disabledCount = 0;
  let variableCount = 0;

  formdata.forEach((item) => {
    // Disable optional fields
    if (!requiredFields.includes(item.key)) {
      item.disabled = true;
      disabledCount++;
    }

    // Replace placeholder values with collection variables (reuse existing FIELD_VARIABLES)
    if (FIELD_VARIABLES[item.key] && item.value !== FIELD_VARIABLES[item.key]) {
      item.value = FIELD_VARIABLES[item.key];
      variableCount++;
    }
  });

  return { disabledCount, variableCount };
}

/**
 * Comment out optional fields in a JSON body string
 * @param {string} bodyJson - The original JSON body
 * @param {string[]} requiredFields - Array of required field names
 * @param {object|null} exampleValues - Example values from OpenAPI schema (first example)
 */
function commentOutOptionalFields(
  bodyJson,
  requiredFields,
  exampleValues = null,
) {
  try {
    const parsed = JSON.parse(bodyJson);
    const keys = Object.keys(parsed);

    if (keys.length === 0) return bodyJson;

    const lines = [];

    // Separate required and optional fields
    const requiredKeys = keys.filter((k) => requiredFields.includes(k));
    const optionalKeys = keys.filter((k) => !requiredFields.includes(k));

    // Build required fields first
    requiredKeys.forEach((key, index) => {
      // Priority: collection variable (for relationships) > example value > original placeholder
      // Collection variables ({{agentId}}, {{toolId}}) reference resources created earlier in test flow
      let value;
      if (FIELD_VARIABLES[key]) {
        value = JSON.stringify(FIELD_VARIABLES[key]);
      } else if (exampleValues && exampleValues[key] !== undefined) {
        value = JSON.stringify(exampleValues[key]);
      } else {
        value = JSON.stringify(parsed[key]);
      }
      // Add comma if there are more required fields OR if there will be commented fields
      const needsComma = index < requiredKeys.length - 1;
      const comma = needsComma ? ',' : '';
      lines.push(`    "${key}": ${value}${comma}`);
    });

    // Then optional fields (commented out)
    if (optionalKeys.length > 0) {
      optionalKeys.forEach((key) => {
        // Priority: collection variable (for relationships) > example value > original placeholder
        let value;
        if (FIELD_VARIABLES[key]) {
          value = JSON.stringify(FIELD_VARIABLES[key]);
        } else if (exampleValues && exampleValues[key] !== undefined) {
          value = JSON.stringify(exampleValues[key]);
        } else {
          value = JSON.stringify(parsed[key]);
        }
        lines.push(`    // "${key}": ${value},`);
      });
    }

    return '{\n' + lines.join('\n') + '\n}';
  } catch (e) {
    console.warn('  Warning: Could not parse JSON body:', e.message);
    return bodyJson; // Return unchanged if parse fails
  }
}

/**
 * Process all items in the collection recursively
 */
function transformCollection(
  collection,
  pathToSchema,
  requiredMap,
  formDataSchemaMap,
) {
  let bodyTransformCount = 0;
  let urlVarTransformCount = 0;
  let formdataTransformCount = 0;

  function processItem(item) {
    // Process nested items
    if (item.item) {
      item.item.forEach(processItem);
    }

    // Skip if no request
    if (!item.request) return;

    const method = item.request.method;
    const urlPath = item.request.url?.path;

    if (!urlPath) return;

    // Convert to OpenAPI path format
    const openApiPath = postmanPathToOpenApiPath(urlPath);
    const mapKey = `${method}::${openApiPath}`;

    // Transform URL path variables (for all request types)
    if (transformUrlVariables(item, openApiPath)) {
      console.log(`  URL vars: ${mapKey} -> using collection variables`);
      urlVarTransformCount++;
    }

    // Transform request body (for POST, PUT, PATCH only)
    if (
      item.request.body?.mode === 'raw' &&
      item.request.body.raw &&
      ['POST', 'PUT', 'PATCH'].includes(method)
    ) {
      // Find the schema info for this endpoint
      const schemaInfo = pathToSchema[mapKey];

      if (schemaInfo) {
        let requiredFields;
        let exampleValues = null;
        let schemaLabel;

        if (schemaInfo.schemaName) {
          // $ref schema - look up in requiredMap
          requiredFields = requiredMap[schemaInfo.schemaName] || [];
          schemaLabel = schemaInfo.schemaName;
        } else if (schemaInfo.inlineSchema) {
          // Inline schema (oRPC) - use required from inline and get first example
          requiredFields = schemaInfo.required || [];
          if (schemaInfo.examples && schemaInfo.examples.length > 0) {
            exampleValues = schemaInfo.examples[0];
          }
          schemaLabel = '(inline)';
        } else {
          return; // No schema info available
        }

        console.log(`  Body: ${mapKey}`);
        console.log(`    Schema: ${schemaLabel}`);
        console.log(
          `    Required fields: ${requiredFields.length > 0 ? requiredFields.join(', ') : '(none - all optional)'}`,
        );
        if (exampleValues) {
          console.log(`    Example values: ${JSON.stringify(exampleValues)}`);
        }

        item.request.body.raw = commentOutOptionalFields(
          item.request.body.raw,
          requiredFields,
          exampleValues,
        );
        bodyTransformCount++;
      }
    }

    // Transform formdata body (for multipart endpoints)
    if (
      item.request.body?.mode === 'formdata' &&
      item.request.body.formdata &&
      ['POST', 'PUT', 'PATCH'].includes(method)
    ) {
      const formDataInfo = formDataSchemaMap[mapKey];
      if (formDataInfo) {
        const requiredFields = formDataInfo.required || [];
        console.log(`  Formdata: ${mapKey}`);
        console.log(`    Required fields: ${requiredFields.join(', ')}`);

        const { disabledCount, variableCount } = transformFormdata(
          item.request.body.formdata,
          requiredFields,
        );
        console.log(`    Disabled ${disabledCount} optional fields`);
        console.log(
          `    Replaced ${variableCount} placeholder values with variables`,
        );
        formdataTransformCount++;
      }
    }
  }

  collection.item?.forEach(processItem);
  return { bodyTransformCount, urlVarTransformCount, formdataTransformCount };
}

// Main execution
console.log('='.repeat(60));
console.log('Transform Optional Fields - Post-Processor');
console.log('='.repeat(60));

const openapi = JSON.parse(fs.readFileSync(OPENAPI_PATH, 'utf8'));
const collection = JSON.parse(fs.readFileSync(COLLECTION_PATH, 'utf8'));

const requiredMap = getRequiredFieldsMap(openapi);
const pathToSchema = getPathToSchemaMap(openapi);
const formDataSchemaMap = getFormDataSchemaMap(openapi);

console.log('\nSchemas with required fields:');
for (const [schema, fields] of Object.entries(requiredMap)) {
  console.log(`  ${schema}: [${fields.join(', ')}]`);
}

console.log('\nPath to Schema mapping:');
for (const [path, info] of Object.entries(pathToSchema)) {
  if (info.schemaName) {
    console.log(`  ${path} -> ${info.schemaName}`);
  } else {
    const hasExamples = info.examples && info.examples.length > 0;
    console.log(`  ${path} -> (inline)${hasExamples ? ' [has examples]' : ''}`);
  }
}

console.log('\nFormdata endpoints:');
for (const [path, info] of Object.entries(formDataSchemaMap)) {
  console.log(`  ${path} -> required: [${info.required.join(', ')}]`);
}

console.log('\nTransforming collection...');
const { bodyTransformCount, urlVarTransformCount, formdataTransformCount } =
  transformCollection(collection, pathToSchema, requiredMap, formDataSchemaMap);

fs.writeFileSync(COLLECTION_PATH, JSON.stringify(collection, null, '\t'));

console.log('\n' + '='.repeat(60));
console.log(`Transformed ${bodyTransformCount} request bodies`);
console.log(`Transformed ${urlVarTransformCount} URL path variables`);
console.log(`Transformed ${formdataTransformCount} formdata bodies`);
console.log('Optional fields are now commented out / disabled');
console.log('URL path variables now use collection variables');
console.log('='.repeat(60));
