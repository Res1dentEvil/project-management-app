import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import './FlagSelect.scss';

export const FlagSelect = () => {
  const [select, setSelect] = useState('GB');
  const onSelect = (country: string) => setSelect(country);
  return (
    <div>
      <ReactFlagsSelect
        selected={select}
        onSelect={onSelect}
        countries={['UA', 'GB']}
        customLabels={{ UA: 'UA', GB: 'EN' }}
        className="menu-flags"
        /*showSelectedLabel={showSelectedLabel}
        selectedSize={selectedSize}
        showOptionLabel={showOptionLabel}
        optionsSize={optionsSize}
        placeholder={placeholder}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        alignOptionsToRight={alignOptionsToRight}
        fullWidth={fullWidth}
        disabled={disabled} */
      />
    </div>
  );
};
