import React, {Dispatch, SetStateAction, useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import colors from '../../../colors';

type Props = {
  year: number;
  years: number[];
  setYear: Dispatch<SetStateAction<number>>;
  onSelected?: (year: number) => void;
};

const styles = StyleSheet.create({
  picker: {
    marginVertical: 'auto',
    borderWidth: 0,
    backgroundColor: colors.main_bg,
    zIndex: 1000,
    marginBottom: 0,
    padding: 0,
    marginHorizontal: 0,
    // position: 'absolute',
  },
  container: {
    width: 100,
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  dropdownContainer: {
    borderWidth: 1,
    shadowOffset: {width: 0, height: 2},
  },
  label: {
    fontWeight: 'bold',
    width: 'auto',
  },
  arrowIcon: {
    width: 7,
  },
  arrowIconContainer: {
    width: 'auto',
    padding: 0,
    margin: 0,
  },
  text: {
    margin: 0,
    padding: 0,
    fontSize: 14,
    color: colors.dark_gray,
    textAlign: 'center',
  },
});

export const DropdownYear = ({year, years, setYear, onSelected}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      style={styles.picker}
      open={open}
      value={year}
      items={years.map(y => ({label: y + '', value: y}))}
      setOpen={setOpen}
      setValue={setYear}
      onSelectItem={
        ((item: {label: string; value: number}) => {
          onSelected && onSelected(item.value);
          return;
        }) as any
      }
      containerStyle={styles.container}
      labelStyle={styles.label}
      dropDownContainerStyle={styles.dropdownContainer}
      arrowIconStyle={styles.arrowIcon}
      arrowIconContainerStyle={styles.arrowIconContainer}
      textStyle={styles.text}
    />
  );
};
