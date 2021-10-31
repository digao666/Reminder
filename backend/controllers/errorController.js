export async function pageNotFound(req, res, next) {
  res.status(404).send('Not Found');
}

export async function serverError(err, req, res, next) {
  res.status(500).send('Try again later');
}
