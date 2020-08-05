module.exports = ({ development, browser }) => {
  const js = [
    {
      loader: 'babel-loader',
    },
    {
      loader: 'eslint-loader',
      options: {
        fix: true,
      },
    },
  ];

  const css = [
    {
      loader: browser ? 'css-loader' : 'css-loader/locals',
    },
    {
      loader: 'postcss-loader',
    },
  ];

  const sass = [
    // Extende css
    ...css,
    {
      loader: 'sass-loader',
    },
  ];

  const svg = [
    {
      loader: 'desvg-loader/react',
    },
    {
      loader: 'svg-loader',
    },
  ];

  const images = {
    loader: 'file-loader',
    options: {
      emitFile: browser,
      name: development
        ? '[path][name].[ext]'
        : 'static/images/[name].[hash:8].[ext]',
    },
  };

  const fonts = {
    loader: 'file-loader',
    options: {
      emitFile: browser,
      name: development
        ? '[path][name].[ext]'
        : 'static/fonts/[name].[hash:8].[ext]',
    },
  };

  return {
    js,
    css,
    sass,
    svg,
    images,
    fonts,
  };
};
