const upload = require("./upload");
const create = require("./create");
const get_token = require("./get_token");
const sendEmail = require("./sendEmail");

exports.create = create.create;
exports.upload = upload.upload;
exports.get_token = get_token.get_token;
exports.sendEmail = sendEmail.sendEmail;
