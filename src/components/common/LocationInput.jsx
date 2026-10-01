import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, ChevronDown } from 'lucide-react';
import { TN_DISTRICTS } from '../../utils/tnDistricts';

export default function LocationInput({
  name,
  value,
  onChange,
  placeholder,
  inputRef,
  onDetect,
  loadingDetect,
  className = '',
  inputClassName = '',
  required = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Filter districts based on typed input
  const search = (value || '').toLowerCase().trim();
  const filteredDistricts = TN_DISTRICTS.filter((d) => {
    if (!search) return true;
    return (
      d.name.toLowerCase().includes(search) ||
      d.code.toLowerCase().includes(search)
    );
  });

  // Split districts into 2 columns: 19 on left, 19 on right when full list
  const midpoint = !search ? 19 : Math.ceil(filteredDistricts.length / 2);
  const leftColumn = filteredDistricts.slice(0, midpoint);
  const rightColumn = filteredDistricts.slice(midpoint);

  const handleSelectDistrict = (district) => {
    const formattedValue = `${district.name} (${district.code})`;
    if (onChange) {
      onChange({
        target: {
          name,
          value: formattedValue
        }
      });
    }
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Input container */}
      <div className="relative flex items-center">
        <MapPin className="absolute left-3.5 text-slate-400 w-4 h-4 lg:w-4.5 lg:h-4.5 pointer-events-none z-10" />

        <input
          ref={inputRef}
          type="text"
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-14 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm transition-all text-slate-900 outline-none ${inputClassName}`}
          required={required}
          autoComplete="off"
        />

        <div className="absolute right-2.5 flex items-center gap-1 z-10">
          {onDetect && (
            <button
              type="button"
              onClick={() => {
                onDetect();
                setIsOpen(false);
              }}
              className="p-1 text-slate-400 hover:text-yellow-500 transition-colors focus:outline-none"
              title="Detect Live Location"
            >
              {loadingDetect ? (
                <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Navigation className="w-4 h-4 hover:scale-110 active:scale-95 transition-transform" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-1 text-slate-400 hover:text-yellow-500 transition-colors focus:outline-none"
            title="Toggle District List"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-yellow-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Option Box Dropdown - 38 Districts (19 left, 19 right) */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="bg-slate-900 text-white px-3 py-2 text-xs font-bold font-poppins flex justify-between items-center border-b border-slate-800">
            <span className="text-yellow-400 uppercase tracking-wider text-[11px]">Select TN District</span>
            <span className="text-[10px] text-slate-400 font-normal">38 Districts (19 L | 19 R)</span>
          </div>

          {filteredDistricts.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500 font-medium">
              No matching district found. You can type custom location above.
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-amber-300">
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {/* Left Column (19 Items) */}
                <div className="space-y-1">
                  {leftColumn.map((dist) => (
                    <button
                      key={dist.code}
                      type="button"
                      onClick={() => handleSelectDistrict(dist)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all hover:bg-amber-50 group border border-transparent hover:border-amber-200/60 ${
                        value === `${dist.name} (${dist.code})` ? 'bg-amber-100/80 font-bold border-amber-300' : ''
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-amber-900 truncate pr-1">
                        {dist.name}
                      </span>
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 group-hover:bg-yellow-400 group-hover:text-slate-950 transition-colors">
                        {dist.code}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Right Column (19 Items) */}
                <div className="space-y-1">
                  {rightColumn.map((dist) => (
                    <button
                      key={dist.code}
                      type="button"
                      onClick={() => handleSelectDistrict(dist)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all hover:bg-amber-50 group border border-transparent hover:border-amber-200/60 ${
                        value === `${dist.name} (${dist.code})` ? 'bg-amber-100/80 font-bold border-amber-300' : ''
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-amber-900 truncate pr-1">
                        {dist.name}
                      </span>
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 group-hover:bg-yellow-400 group-hover:text-slate-950 transition-colors">
                        {dist.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
