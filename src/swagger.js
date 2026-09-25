import YAML from "yamljs";

const swaggerDocument = YAML.load("./swagger.yaml");

export default swaggerDocument;