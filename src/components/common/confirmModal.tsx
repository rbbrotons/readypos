"use client";


import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

interface ConfirmModalProps {
    message: string;
    header: string;
    onAccept: () => void;
    onReject?: () => void;
}

// 1. Esta es la función que ya llamás desde tu Sidebar
export const showConfirm = ({ message, header, onAccept, onReject }: ConfirmModalProps) => {
    confirmDialog({
        message,
        header,
        position:'center',
        blockScroll: true,
        baseZIndex: 10000,
        headerClassName: 'pt-6 px-6 pb-0 text-xl font-bold border-none',
        contentClassName: 'flex flex-col items-center justify-center text-center px-6 py-6 gap-4',
        className: 'w-[90vw] md:w-[400px] custom-confirm-dialog',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        acceptClassName: 'p-button-danger px-10 py-3 font-bold rounded-lg',
        rejectClassName: 'p-button-success px-10 py-3 font-bold rounded-lg',
        accept: onAccept,
        reject: onReject,
    });
};

// 2. Exportamos este componente vacío por si PrimeReact necesita el nodo en el DOM
export const ConfirmModalComponent = () => {
    return <ConfirmDialog />;
};