import React, { useEffect, useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import './FlagSelect.scss';
import { useTranslation } from 'react-i18next';

export const FlagSelect = () => {
  const [select, setSelect] = useState('GB');
  const onSelect = (country: string) => setSelect(country);

  const { i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  useEffect(() => {
    switch (select) {
      case 'GB':
        changeLanguage('en');
        break;
      case 'UA':
        changeLanguage('ua');
        break;
      default:
        break;
    }
  }, [select]);

  return (
    <div>
      <ReactFlagsSelect
        selected={select}
        onSelect={onSelect}
        countries={['UA', 'GB']}
        customLabels={{ UA: 'ua', GB: 'en' }}
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
