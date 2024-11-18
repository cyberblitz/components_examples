 type ShiftCode = 'DO' | 'DX' | 'NX';

 interface Shift {
  date: string;
  staffName: string;
  role: string;
  shiftCode: ShiftCode;
}


const shifts: Shift[] = [
  { date: '2024-08-19', staffName: "Fred FlintStone", role: 'CN', shiftCode: 'DX' },
  { date: '2024-08-20', staffName: "Fred FlintStone", role: 'CN', shiftCode: 'NX' },
  { date: '2024-08-21', staffName: "Fred FlintStone", role: 'A/NUM', shiftCode: 'DX' },
  { date: '2024-08-22', staffName: "Betty Rubble", role: 'RN', shiftCode: 'DX' },
  // Add more shift data as needed...
];


//aliasnested: {[role: string]: { [staffName: string] : { [date: string]: Shift[] }}}
type GroupedShifts = {
  [role: string]: {
    [staffName: string]: {
      [date: string]: Shift[];
    };
  };
};


const groupShiftsByStaff = (shifts: Shift[]): GroupedShifts => {
    return shifts.reduce((acc, shift) => {
      if (!acc[shift.role]) {
        acc[shift.role] = {};
      }

      if (!acc[shift.role][shift.staffName]) {
        acc[shift.role][shift.staffName] = {};
      }

      if (!acc[shift.role][shift.staffName][shift.date]) {
        acc[shift.role][shift.staffName][shift.date] = [];
      }
      !acc[shift.role][shift.staffName][shift.date].push(shift);
      return acc;
    }, {} as GroupedShifts );
  }

  console.log(groupShiftsByStaff(shifts))


