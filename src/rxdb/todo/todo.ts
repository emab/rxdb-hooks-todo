import {
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";

const todoSchemaLiteral = {
  version: 0,
  primaryKey: "id",
  type: "object",
  description: "JSON Schema for a TODO list",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
      description: "The unique identifier for a TODO item",
    },
    title: {
      type: "string",
      maxLength: 100,
      description: "The title of the TODO item",
    },
    done: {
      type: "boolean",
      description: "Whether the TODO item is done or not",
    },
    description: {
      type: "string",
      description: "The description of the TODO item",
    },
    timestamp: {
      type: "string",
      format: "date-time",
      description: "The timestamp of the TODO item",
    },
  },
  required: ["id", "title", "done", "timestamp"],
} as const;

const schemaTyped = toTypedRxJsonSchema(todoSchemaLiteral);

export type TodoDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;
export const todoSchema: RxJsonSchema<TodoDocType> = todoSchemaLiteral;
