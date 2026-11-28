import { useEffect, useEffectEvent, useRef } from 'react';

const focusableSelector =
  'button, a[href], input, select, textarea, [tabindex], [contenteditable="true"]';

export function useDialogFocus(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const requestClose = useEffectEvent(onClose);

  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;

    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const getFocusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
      .filter(element => element.tabIndex >= 0 && !element.matches(':disabled, [inert] *') && element.getClientRects().length > 0);

    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => {
      if (!dialog.contains(document.activeElement)) {
        (getFocusable()[0] ?? dialog).focus({ preventScroll: true });
      }
    });

    function handleKey(event: KeyboardEvent) {
      const dialogs = Array.from(document.querySelectorAll('[aria-modal="true"], dialog:modal'));
      if (dialogs.at(-1) !== dialog) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        requestClose();
      }
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable.at(-1);
      const active = document.activeElement;
      if (!first || !dialog.contains(active) || active === dialog ||
          (event.shiftKey && active === first) || (!event.shiftKey && active === last)) {
        event.preventDefault();
        ((event.shiftKey ? last : first) ?? dialog).focus();
      }
    }

    document.addEventListener('keydown', handleKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open]);

  return ref;
}
