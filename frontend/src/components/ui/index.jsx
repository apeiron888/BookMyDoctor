export const Button = ({ children, variant = 'primary', className = '', disabled = false, ...props }) => {
    const baseClass = 'btn';
    const variantClass = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
    }[variant];
    
    return (
        <button
            className={`${baseClass} ${variantClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export const Input = ({ label, error, className = '', ...props }) => (
    <div className="mb-4">
        {label && <label className="block text-sm font-medium mb-1">{label}</label>}
        <input className={`input ${className} ${error ? 'border-danger' : ''}`} {...props} />
        {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
);

export const Card = ({ children, className = '' }) => (
    <div className={`card ${className}`}>{children}</div>
);

export const Spinner = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
);

export const StatusBadge = ({ status }) => {
    const colors = {
        scheduled: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100'}`}>
            {status}
        </span>
    );
};

export const Modal = ({ isOpen, title, children, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-96 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                {children}
            </Card>
        </div>
    );
};
