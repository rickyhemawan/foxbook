function generateErrorMessage(message) {
  return { errors: [{ message }] }
}

function parseErrorMessage(err) {
  if(!err.errors) return [];
  return err.errors.map(e => e.message)
}

module.exports = { generateErrorMessage, parseErrorMessage }