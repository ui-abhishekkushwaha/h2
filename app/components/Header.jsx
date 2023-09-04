import { Await, NavLink, useMatches } from '@remix-run/react';
import { Suspense } from 'react';

export function Header({ header, isLoggedIn, cart }) {
  const { shop, menu } = header;
  return (
    <header className="relative z-1 w-full h-16 sm:h-20 lg:h-24" style={{ zIndex: '1' }}>
      <div className='fixed z-1 w-full h-16 px-4 text-gray-700 transition duration-200 ease-in-out bg-white innerSticky body-font sm:h-20 lg:h-24 md:px-8 lg:px-6'>
        <div className='flex items-center justify-center mx-auto max-w-[1920px] h-full w-full'>
          <div className='inline-flex'>
            <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
              {/* <strong>{shop.name}</strong> */}
              <img
                src="https://chawkbazar.vercel.app/assets/images/logo.svg"
                style={{ width: "100%", height: "100%", minWidth: '100px' }}
                alt="Logo"
              />            </NavLink>
          </div>
          <HeaderMenu menu={menu} viewport="desktop" />
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
      </div>
    </header>
  );
}

export function HeaderMenu({ menu, viewport }) {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  const className = `header-menu-${viewport}   w-full relative hidden lg:flex ltr:md:ml-6 rtl:md:mr-6 ltr:xl:ml-10 rtl:xl:mr-10`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <div className='menuItem group cursor-pointer py-7 relative'>
            <NavLink
              className="header-menu-item relative inline-flex items-center px-3 py-2 text-sm font-normal xl:text-base text-heading xl:px-4 group-hover:text-black"
              end
              key={item.id}
              onClick={closeAside}
              prefetch="intent"
              style={activeLinkStyle}
              to={url}
            >
              {item.title}
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
}

function HeaderCtas({ isLoggedIn, cart }) {
  return (
    <nav className="header-ctas items-center justify-end flex-shrink-0 hidden lg:flex gap-x-6 lg:gap-x-5 xl:gap-x-8 2xl:gap-x-10 ltr:ml-auto rtl:mr-auto" role="navigation">
      {/* <HeaderMenuMobileToggle /> */}
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle} className="-mt-0.5 flex-shrink-0">
        <span className='text-sm font-semibold xl:text-base text-heading'> {isLoggedIn ? 'Account' : 'Sign in'}</span>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return <a href="#search-aside" className='relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none'>
    <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="18px" viewBox="0 0 18.942 20" className="md:w-4 xl:w-5 md:h-4 xl:h-5">
      <path d="M381.768,385.4l3.583,3.576c.186.186.378.366.552.562a.993.993,0,1,1-1.429,1.375c-1.208-1.186-2.422-2.368-3.585-3.6a1.026,1.026,0,0,0-1.473-.246,8.343,8.343,0,1,1-3.671-15.785,8.369,8.369,0,0,1,6.663,13.262C382.229,384.815,382.025,385.063,381.768,385.4Zm-6.152.579a6.342,6.342,0,1,0-6.306-6.355A6.305,6.305,0,0,0,375.615,385.983Z" transform="translate(-367.297 -371.285)" fill="currentColor" fillRule="evenodd"></path>
    </svg>
  </a >;
}

function CartBadge({ count }) {
  return <a href="#cart-aside" className='relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none'>
    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 20 20" class="md:w-4 xl:w-5 md:h-4 xl:h-5">
      <path d="M5,4H19a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4ZM2,5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3V19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3Zm10,7C9.239,12,7,9.314,7,6H9c0,2.566,1.669,4,3,4s3-1.434,3-4h2C17,9.314,14.761,12,12,12Z" transform="translate(-2 -2)" fill="currentColor" fillRule="evenodd"></path>
    </svg>
    <span class="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 rounded-full ltr:-right-2.5 ltr:xl:-right-3 rtl:-left-2.5 rtl:xl:-left-3 font-bold">{count}</span></a>;
}

function CartToggle({ cart }) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({ isActive, isPending }) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
