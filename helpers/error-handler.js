function generateErrorMessage(message) {
  return { errors: [{ message }] }
}

function parseErrorMessage(err) {
  return err.errors.map(e => e.message)
}

module.exports = { generateErrorMessage, parseErrorMessage }