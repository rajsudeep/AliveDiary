import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import Mitt from 'mitt';
import { createEditor } from 'slate';
import { initialValue } from './slateInitialValue';

interface Props {}

const emitter = Mitt();

export const SyncingEditor: React.FC<Props> = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const id = useRef(`${Date.now()}`);
    const [value, setValue] = useState<any>(initialValue);
    const remote = useRef(false);

    useEffect(() => {
        (emitter as any).on('*', (type: string, newValue: any) => {
            if (id.current !== type) {
                remote.current = true;
                setValue(newValue);
                console.log('change happened in other editor');
                remote.current = false;
            }
        })
    }, [])

    return (
        <Slate 
            editor={editor} 
            value={value} 
            onChange={newValue => {
                setValue(newValue);
                if (newValue !== value && !remote.current) {
                    emitter.emit(id.current, newValue);
                }
            }}
        >
            <Editable
                style={{
                    backgroundColor: '#E7EEE7',
                    maxWidth: '80rem',
                    minHeight: '15rem'
                }}
            />
        </Slate>
    )
}