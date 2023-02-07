import { useState, useEffect, memo, useRef } from 'react';
import { createPortal } from 'react-dom';

const Window = memo(({ children, setShowWindowPortal }) => {
    const [win, setWin] = useState(null);
    const [el, setEl] = useState(null);

    const componentRef = useRef();
    const handlePrint = () => {
        win.print();
    };

    useEffect(() => {
        let win = window.open("about:blank", "_blank");
        win.document.title = 'Invoice';

        const linkEl = document.createElement('link');
        linkEl.rel = 'stylesheet';
        linkEl.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
        win.document.head.appendChild(linkEl);

        let el = document.createElement('div');
        el.style.padding = '5% 10%';
        el.style.height = '100%';
        win.document.body.appendChild(el);

        const hideHeaderFooterStyles = document.createElement("style");
        hideHeaderFooterStyles.innerHTML = `
          @page {
            margin: 0;
          }
          body {
            background-color: #ffffff;
            margin: 0;
          }
        `;
        win.document.head.appendChild(hideHeaderFooterStyles);

        const printStyles = document.createElement('style');
        printStyles.innerHTML = `
            @media print {
                .print-only {
                    display: block !important;
                }
                .no-print {
                    display: none !important;
                }
            }
        `;
        win.document.head.appendChild(printStyles);

        setWin(win);
        setEl(el);

        const handleWindowClose = () => {
            setShowWindowPortal(false);
        };

        win.addEventListener("beforeunload", handleWindowClose);

        return () => {
            win.removeEventListener("beforeunload", handleWindowClose);
            win.close()
        };
    }, []);

    if (!el) return null;

    return createPortal(
        <>
            <button onClick={handlePrint} className="btn btn-warning fw-bold mb-3 no-print">Print / Download Invoice</button>
            <div ref={componentRef} className="print-only">
                {children}
            </div>
        </>, el
    );
});

export default Window;