const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const isBodyEmpty = function (data) {
  if (Object.keys(data).length == 0) return false;
  return true;
};

const isValid = function (value) {
  if (typeof value === "undefined" || typeof value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidOptional = function (value) {
  if (value) {
    if (typeof value === "boolean") return true;
    else return false;
  }
  return true;
};

const isValidObjectId = function (id) {
  if (ObjectId.isValid(id)) return true;
  return false;
};
const regex = /^[a-zA-Z ]+$/;
const isVerifyString = function (value) {
  return regex.test(value);
};

module.exports = {
  isBodyEmpty,
  isValid,
  isValidOptional,
  isValidObjectId,
  isVerifyString,
};
