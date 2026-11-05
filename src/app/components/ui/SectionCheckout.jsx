function SectionCheckout({ icon: Icon, title, step, children }) {
  return (
    <div className="card-soft p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm shrink-0">
          {step}
        </div>
        <h2 className="font-bold text-secondary-700">{title}</h2>
        <Icon size={18} className="text-gray-300 ml-auto" />
      </div>
      {children}
    </div>
  );
}

export default SectionCheckout;
