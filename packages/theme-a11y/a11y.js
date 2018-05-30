/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 */

/**
 * For use when focus shifts to a container rather than a link
 * eg for In-page links, after scroll, focus shifts to content area so that
 * next `tab` is where user expects if focusing a link, just $link.focus();
 */
export function pageLinkFocus(element, config = {}) {
  const { className = "js-focus-hidden" } = config;
  const savedTabIndex = element.tabIndex;

  element.tabIndex = -1;
  element.dataset.tabIndex = savedTabIndex;
  element.focus();
  element.classList.add(className);
  element.addEventListener("blur", callback);

  function callback(event) {
    event.target.removeEventListener(event.type, callback);

    element.tabIndex = savedTabIndex;
    delete element.dataset.tabIndex;
    element.classList.remove(className);
  }
}

/**
 * If there's a hash in the url, focus the appropriate element
 */

export function focusHash() {
  const hash = window.location.hash;
  const element = document.getElementById(hash.slice(1));
  // is there a hash in the url? is it an element on the page?

  if (hash && element) {
    pageLinkFocus(element);
  }
}

/**
 * When an in-page (url w/hash) link is clicked, focus the appropriate element
 */
export function bindInPageLinks() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    const element = document.querySelector(link.hash);

    if (!element) {
      return;
    }

    link.addEventListener("click", () => {
      pageLinkFocus(element);
    });
  });
}

/**
 * Traps the focus in a particular container
 *
 * @param {object} options - Options to be used
 * @param {jQuery} options.$container - Container to trap focus within
 * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
 * @param {string} options.namespace - Namespace used for new focus event handler
 */

export function trapFocus(container, element) {
  document.body.style.backgroundColor = "red";
  //   const eventName = options.namespace
  //     ? `focusin.${options.namespace}`
  //     : 'focusin';
  //   if (!options.$elementToFocus) {
  //     options.$elementToFocus = options.$container;
  //   }
  //   options.$container.attr('tabindex', '-1');
  //   options.$elementToFocus.focus();
  //   $(document).on(eventName, (evt) => {
  //     if (
  //       options.$container[0] !== evt.target &&
  //       !options.$container.has(evt.target).length
  //     ) {
  //       options.$container.focus();
  //     }
  //   });
}

// /**
//  * Removes the trap of focus in a particular container
//  *
//  * @param {object} options - Options to be used
//  * @param {jQuery} options.$container - Container to trap focus within
//  * @param {string} options.namespace - Namespace used for new focus event handler
//  */
// export function removeTrapFocus(options) {
//   const eventName = options.namespace
//     ? `focusin.${options.namespace}`
//     : 'focusin';

//   if (options.$container && options.$container.length) {
//     options.$container.removeAttr('tabindex');
//   }

//   $(document).off(eventName);
// }
