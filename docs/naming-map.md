# Naming Map

## Wave 1 — Area A: Nav/Header/Footer

| OLD | NEW | Status |
|---|---|---|
| `site-header` | `header-bar` | verified |
| `nav-link` | `header-nav__link` | verified |
| `nav-link-muted` | `header-nav__link--muted` | verified |
| `hide-mobile` | `u-hide-mobile` | verified |
| `site-footer` | `footer-bar` | verified |
| `site-content` | `layout-main` | verified |
| `underline-reveal` | `link-underline` | verified |
| `link-hover` | `link-hoverable` | verified |

## Wave 1 — Area B: Orbit/HomeHero/Carousel

| OLD | NEW | Status |
|---|---|---|
| `home-root` | `orbit-page` | verified |
| `home-inner` | `orbit-page__inner` | verified |
| `rotor-wrapper` | `orbit-carousel` | verified |
| `rotor` | `orbit-carousel__track` | verified |
| `slider-item` | `orbit-carousel__card` | verified |
| `parallax-item` | `orbit-carousel__card--parallax` | verified |
| `preserve-3d` | `u-preserve-3d` | verified |
| `project-info-panel` | `orbit-carousel__info-panel` | verified |

## Wave 2 — Internal JS/TS Symbol Naming

### `src/components/OrbitCarousel.tsx`

| OLD | NEW | Status |
|---|---|---|
| `containerRef` | `carouselContainerRef` | verified |
| `rotorRef` | `carouselTrackRef` | verified |
| `rotationRef` | `trackRotationRef` | verified |
| `speedRef` | `rotationVelocityRef` | verified |
| `rafRef` | `rotationRafRef` | verified |
| `parallaxRafRef` | `parallaxLoopRafRef` | verified |
| `parallaxItemsRef` | `parallaxCardRefs` | verified |
| `mousePosRef` | `mouseCurrentRef` | verified |
| `activeIndex` | `activeProjectIndex` | verified |
| `items` | `projects` | verified |
| `itemCount` | `projectCount` | verified |
| `angleStep` | `degreesPerProject` | verified |
| `maxSpeed` | `maxRotationVelocity` | verified |
| `handleMouseMove` | `onMouseMove` | verified |
| `handleMouseLeave` | `onMouseLeave` | verified |
| `e` (event params) | `event` | verified |
| `i` (forEach index) | `cardIndex` | verified |
| `el` (forEach element) | `parallaxCardElement` | verified |
| `index` (project map index) | `projectIndex` | verified |

### `src/components/CustomCursor.tsx`

| OLD | NEW | Status |
|---|---|---|
| `isEnabled` | `isCursorEnabled` | verified |
| `posRef` | `cursorPositionRef` | verified |
| `targetRef` | `cursorTargetRef` | verified |
| `rafRef` | `cursorRafRef` | verified |
| `handleMouseMove` | `onMouseMove` | verified |
| `handleMouseOver` | `onMouseOver` | verified |
| `handleMouseLeave` | `onMouseLeaveWindow` | verified |
| `handleMouseEnter` | `onMouseEnterWindow` | verified |
| `e` (event params) | `event` | verified |
| `target` (event target) | `eventTarget` | verified |

### `src/components/ThemeProvider.tsx`

| OLD | NEW | Status |
|---|---|---|
| `mounted` | `isMounted` | verified |
| `stored` | `storedTheme` | verified |
| `media` | `systemDarkModeQuery` | verified |
| `apply` | `applyThemePreference` | verified |
| `handleChange` | `onSystemThemeChange` | verified |
| `current` | `savedThemePreference` | verified |
| `isDark` | `isDarkTheme` | verified |
| `newTheme` | `nextTheme` | verified |
| `set(t)` | `set(nextTheme)` | verified |

### `src/app/layout.tsx` (inline boot script)

| OLD | NEW | Status |
|---|---|---|
| `stored` | `storedTheme` | verified |
| `media` | `systemDarkModeQuery` | verified |
| `catch(e)` | `catch(themeInitError)` | verified |
| `t` (debounce timer) | `timeoutId` | verified |
| `h` (header height) | `headerHeight` | verified |

### `src/app/info/page.tsx` and `src/app/archive/page.tsx`

| OLD | NEW | Status |
|---|---|---|
| `edu` | `educationEntry` | verified |
| `i` (education index) | `educationIndex` | verified |
| `cert` | `certification` | verified |
| `item` (archive entry) | `archiveItem` | verified |

## Wave 3 — File/Component Module Naming

| OLD | NEW | Status |
|---|---|---|
| `src/components/Slider3D.tsx` | `src/components/OrbitCarousel.tsx` | verified |
| `Slider3D` component | `OrbitCarousel` component | verified |
| `src/components/Hero.tsx` | `src/components/HomeHero.tsx` | verified |
| `Hero` component | `HomeHero` component | verified |
