import React, { useMemo, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';

const initialValue = [
  {
    object: 'block',
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<any>(initialValue);

  return (
    <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
      <Editable />
    </Slate>
  )
}

export default App;
