import React, { useMemo, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { initialValue } from './slateInitialValue';

interface Props {

}

export const SyncingEditor: React.FC<Props> = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState<any>(initialValue);

    return (
        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
            <Editable />
        </Slate>
    )
}