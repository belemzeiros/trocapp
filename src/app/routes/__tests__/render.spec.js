import renderRoutes, { layoutHoc } from '../render';

const routesMock = [
  {
    layout: jest.fn(),
    page: jest.fn(),
    path: '/',
    exact: true,
  },
  {
    page: jest.fn(),
    path: '/without-layout',
    exact: true,
  },
];

describe('Render Routes', () => {
  it('Should rendered routes successfully', () => {
    const wrapper = renderRoutes(routesMock);
    expect(wrapper).toMatchSnapshot();
  });

  it('When routes is null', () => {
    const wrapper = renderRoutes(null);
    expect(wrapper).toBeNull();
  });

  it('Should render defined hoc', () => {
    layoutHoc(routesMock[0], {})({});
    layoutHoc(routesMock[1], {})({});
  });
});
