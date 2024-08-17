exports.error_logs = `
CREATE TABLE IF NOT EXISTS \`home_chat\`.\`error_logs\` (
  \`error_logs\` INT NOT NULL AUTO_INCREMENT,
  \`message\` MEDIUMTEXT NULL,
  \`time\` VARCHAR(45) NULL,
  PRIMARY KEY (\`error_logs\`));
`