import { Text, Localizer } from 'preact-i18n';

// An icon-only link acts as a button: Enter and Space activate it like a click.
const onKeyActivate = action => e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    action();
  }
};

// Wrapper of every widget edit form, rendered inside the editor's side
// panel / bottom sheet (EditPanel). Plain markup on purpose: the react-dnd
// wiring that used to live here (a leftover of the pre-v2 editor, where
// these cards sat on the canvas and were themselves draggable) crashed the
// whole panel once the canvas moved to the pointer-drag engine — useDrag
// with no DndProvider above throws 'Expected drag drop context' during
// render, so tapping a widget's settings silently did nothing.
const BaseEditBox = ({ children, ...props }) => (
  <div class="card mb-2">
    <div class="card-header">
      <h3 class="card-title">{props.titleKey && <Text id={props.titleKey} />}</h3>
      <div class="card-options">
        <Localizer>
          <a
            role="button"
            tabIndex="0"
            aria-label={<Text id="global.remove" />}
            onClick={() => props.removeBox(props.x, props.y)}
            onKeyDown={onKeyActivate(() => props.removeBox(props.x, props.y))}
            class="card-options-remove"
          >
            <i class="fe fe-x" />
          </a>
        </Localizer>
      </div>
    </div>
    <div class="card-body">{children}</div>
  </div>
);

export default BaseEditBox;
