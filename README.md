# multi-modal

A flexible React component library for managing multiple same-level modals on a single web page.  
Supports stacking, dragging, resizing, focus handling, and dynamic content.

## 🚀 Overview

`multi-modal` helps you display and manage multiple modal dialogs simultaneously.  
Unlike typical modal systems that assume only one modal at a time, this library is designed for use cases like:

- Complex dashboards
- Multi-pane editors
- Advanced settings/configuration UIs

### ✨ Features

- 📚 Manage multiple modals at once
- 🧠 Automatic focus and z-index handling
- 🖱️ Built-in dragging and resizing
- ⚙️ Open/close modals dynamically with unique content
- 🧩 Fully customizable content and titles

---

## 🔧 Usage

### 1. Wrap your app with `<ModalProvider>` and include `<ModalContainer />`

```tsx
import { ModalProvider, ModalContainer } from "multi-modal";

const App = () => (
  <ModalProvider>
    <YourApp />
    <ModalContainer />
  </ModalProvider>
);
```

### 2. Use `useModal()` to open modals anywhere in your app

```tsx
import { useModal } from "multi-modal";

const MyComponent = () => {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal({
      title: "My Modal",
      content: <p>This is a modal!</p>,
    });
  };

  return <button onClick={handleClick}>Open Modal</button>;
};
```

The modal will automatically:

- Be draggable and resizable
- Come to the front on focus
- Have a built-in close (X) button

---

## 📄 License

MIT License © tmt132 2025
