import { useReducer } from "react";

// An interface for reducer state
interface ShowReducerState {
  isShowing: boolean;
}

const initial = (isShowing: boolean = false): ShowReducerState => ({
  isShowing,
});
const initialState: ShowReducerState = initial();

enum SHOW_ENUM {
  HIDE,
  SHOW,
  TOGGLE,
}

// An interface for reducer action
interface ShowReducerAction {
  type: SHOW_ENUM;
}

const hideAction = () => ({
  type: SHOW_ENUM.HIDE,
});
const showAction = () => ({
  type: SHOW_ENUM.SHOW,
});
const toggleAction = () => ({
  type: SHOW_ENUM.TOGGLE,
});

const reducer = (
  state: ShowReducerState = initialState,
  action: ShowReducerAction
) => {
  const { type } = action;
  const { isShowing } = state;
  switch (type) {
    case SHOW_ENUM.HIDE:
      return { ...state, isShowing: false };
    case SHOW_ENUM.SHOW:
      return { ...state, isShowing: true };
    case SHOW_ENUM.TOGGLE:
      return { ...state, isShowing: !isShowing };
    default:
      return state;
  }
};

const useShow = (initialShowing: boolean = false) => {
  const [{ isShowing }, dispatch] = useReducer(
    reducer,
    initial(initialShowing)
  );

  const hide = () => dispatch(hideAction());
  const show = () => dispatch(showAction());
  const toggle = () => dispatch(toggleAction());

  return {
    isShowing,
    hide,
    show,
    toggle,
  };
};

export default useShow;
