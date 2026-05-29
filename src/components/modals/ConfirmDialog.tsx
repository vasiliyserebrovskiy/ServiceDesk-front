interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <p className="text-gray-700 mb-6 text-center">{message}</p>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={onCancel}
            className="
                    bg-red-600
                    text-white
                    px-3
                    py-0.5
                    rounded
                    cursor-pointer
                    hover:bg-red-800
                    active:scale-95
                    transition
                    duration-150
                  "
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="
                    bg-blue-600
                    text-white
                    px-3
                    py-0.5
                    rounded
                    cursor-pointer
                    hover:bg-blue-800
                    active:scale-95
                    transition
                    duration-150
                  "
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
