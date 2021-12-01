import Select from 'react-select';

const theme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: 'var(--chakra-colors-gray-100)',
    primary: 'var(--chakra-colors-purple-500)',
  },
});

function ReactSelect({options, onChange, placeholder}) {
  return <Select options={options} theme={theme} placeholder={placeholder} onChange={onChange}/>
}

export default ReactSelect;