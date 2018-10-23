const RedirectToPathContext = ({ staticContext = {} }) => {
  staticContext.url = process.env.PATH_CONTEXT;

  return null;
};

export default RedirectToPathContext;
