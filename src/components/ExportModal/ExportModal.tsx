import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.85);
    display: flex;
    align-items: center;
    z-index: 9999;
`;

const ModalContent = styled.div`
    background: #1e1e1e;
    width: 80%;
    masx-width: 800px;
    max-height: 80vh;
    border-radius: 8px;
    border: 1px solid #333;
    display: flex;
    flex-direction: column;
`;

const CodeArea = styled.pre`
    background: #000;
    color: #dcdcdc;
    padding: 20px;
    overflow: auto;
    font-family: 'Fira Code', monospace;
    font-size: 14px;
    line-height: 1.5;
    flex:1;
`;

const Header = styled.div`
    padding: 15px 20px;
    border-bottom: 1px solid #333;
    display: flex;
    justify-content:  space-between;
    align-items: center;
`;

export const ExportModal: React.FC<{ code: string; onClose: () => void }> = ({ code, onClose }) => {
    return (
        <Overlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <Header>
                    <span>React + Styled Components Code</span>
                    <button onClick={onClose} style={{ color: '#ff5f56', background: 'none' }}>Fechar</button>
                </Header>
                <CodeArea>
                    <code>{code}</code>
                </CodeArea>
                <button
                    onClick={() => { navigator.clipboard.writeText(code); alert("Copiado!") }}
                    style={{ padding: '15px', background: '#007acc', color: 'white' }}
                >
                    Copiar Código
                </button>
            </ModalContent>
        </Overlay>
    )
}