import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
const leaveEntitlementLeaves = () => {
  const [leave, leaveType] = useState(false);
  const leaveList = useSelector((state) => state.setup.leaveList);

  console.log({ leaveList });
  const onChnageLeaveType = (val) => {
    if (val.value === 'Annual Leave') {
      leaveType(true);
    } else {
      leaveType(false);
    }
  };

  return [
    {
      label: 'Leave Entilement Name',
      name: 'leave_entitlement_name',
      type: 'input',
      twocol: true,
      placeholder: 'Type leave entitlement name',
      req: true,
      reqmessage: 'Leave Entitlment required',
    },
    {
      label: 'Leave Type',
      name: 'leave_type',
      type: 'select',
      twocol: true,
      placeholder: 'Select leave type',
      req: true,
      reqmessage: 'Leave Type required',
      options: leaveList?.map((value) => ({ label: value.leave_type, value: value.leave_type })),
      onChange: onChnageLeaveType,
    },
    {
      label: 'Entitlement',
      name: 'entitlement',
      type: 'select',
      twocol: true,
      placeholder: 'Select numaber of days',
      req: true,
      reqmessage: 'Entitlment required',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ],
    },
    {
      label: 'Minimum Years of Service',
      name: 'min_years',
      type: 'select',
      twocol: true,
      placeholder: 'Select number of years',
      req: true,
      reqmessage: 'Years required',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ],
    },
    {
      subheading: 'Options',
      name: 'is_limit',
      label: '',
      // class:hid===true?`d-none`:'',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Is limited', value: 1 }],
    },
    {
      name: 'overdraft',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Can overdraft', value: 1 }],
    },
    {
      name: 'apply_before_current_date',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Can apply before current date', value: 1 }],
    },
    {
      name: 'carries_forward',
      class: leave != true ? 'd-none' : '',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Carries forward', value: 1 }],
    },
    {
      name: 'is_prorate',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      colWidth: '0 1 365px',
      reqmessage: '',
      options: [{ label: 'Is prorate', value: 1 }],
    },
    {
      label: 'Carry Forward Cut Off Date',
      name: 'carry_forward_days',
      type: 'input',
      twocol: false,
      req: true,
      reqmessage: 'Date required',
      hidden: !leave,
    },
  ];
};
export { leaveEntitlementLeaves };
