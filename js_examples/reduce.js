var shifts = [
    { date: '2024-08-19', staffName: "Fred FlintStone", role: 'CN', shiftCode: 'DX' },
    { date: '2024-08-20', staffName: "Fred FlintStone", role: 'CN', shiftCode: 'NX' },
    { date: '2024-08-21', staffName: "Fred FlintStone", role: 'A/NUM', shiftCode: 'DX' },
    { date: '2024-08-22', staffName: "Betty Rubble", role: 'RN', shiftCode: 'DX' },
    // Add more shift data as needed...
];
var groupShiftsByRole = function (shifts) {
    const grouped = shifts.reduce((acc, shift) => {
        // Find or create the role object in the accumulator
        let roleObj = acc.find(r => r.role === shift.role);
        if (!roleObj) {
            roleObj = { role: shift.role, staff: [] };
            acc.push(roleObj);
        }
        // Find or create the staff object in the role object
        let staffObj = roleObj.staff.find(s => s.staffName === shift.staffName);
        if (!staffObj) {
            staffObj = { staffName: shift.staffName, shifts: [] };
            roleObj.staff.push(staffObj);
        }
        // Add the shift to the staff's shift array
        staffObj.shifts.push({ date: shift.date, shiftCode: shift.shiftCode });
        return acc;
    }, []);
    return grouped;
};
var result = groupShiftsByRole(shifts);

result.map(role => {
    console.log(`Role: ${role.role}`);

    role.staff.forEach(staff => {
        console.log(`  Staff: ${staff.staffName}`);

        staff.shifts.forEach(shift => {
            console.log(`    Date: ${shift.date}, Shift: ${shift.shiftCode}`);
        });
    });
});


console.log(result);

