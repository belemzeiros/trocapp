const data = {};

const has = key => key in data;

const get = key => has(key) && data[key];

const put = (key, body) => {
  data[key] = body;
};

const middleware = () => (req, res, next) => {
  const key = req.url;

  // Controle de envio de resposta
  let cached = false;

  // Se houver cache, retorna
  if (has(key)) {
    cached = true;
    res.json(get(key));
  }

  // Método para atualizar cache e retornar
  res.cache = (body, error = false) => {
    // Atualiza cache
    if (error === false) {
      put(key, body);
    }
    // Envia caso não tenha cache
    if (!cached) {
      res.json(body);
    }
  };

  // Continua para atualizar cache
  next();
};

module.exports = {
  has,
  get,
  put,
  middleware,
};
