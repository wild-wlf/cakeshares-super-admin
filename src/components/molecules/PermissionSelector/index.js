import GridCol from '@/components/atoms/GridCol';
import adminService from '@/services/adminService';
import React, { useEffect, useMemo, useState } from 'react';
import Field from '../Field';
import Grid from '@/components/atoms/Grid';
import Switch from '../Switch';
import { PermissionListHead, PermissionListGroup } from './PermissionSelector.styles';
import DataTabs from '../DataTabs';
import { CiSearch } from 'react-icons/ci';
import Button from '@/components/atoms/Button';

const PermissionSelector = ({ onPermClose, permissions, onDone = () => {} }) => {
  const [state, setState] = useState({});

  const [searchPerm, setSearchPerm] = useState({
    group: '',
    permission: '',
  });

  const [searchGroup, setSearchGroup] = useState('');
  const [isClosed, setIsClosed] = useState(false);
  const {
    permissions_data: { permissions: all_permissions },
  } = adminService.GetPermissions({ getAll: true });

  const data = useMemo(
    () =>
      Object.entries(
        all_permissions?.reduce((acc, permission) => {
          const group = permission?.can?.split('.')[0];
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(permission);
          return acc;
        }, {}),
      )
        .filter(
          ([group]) => searchGroup.toLowerCase() === '' || group.toLowerCase().includes(searchGroup.toLowerCase()),
        )
        .map(([group, _]) => ({
          label: group,
          content: (
            <PermissionListGroup>
              <PermissionListHead>
                <Switch
                  noMargin
                  label="Select All"
                  name={`${group}_all`}
                  value={_.every(({ _id }) => state?.find(({ _id: __id }) => __id === _id))}
                  onChange={({ target: { value } }) => {
                    setState(s =>
                      value
                        ? s.concat(_.filter(({ _id }) => !s?.find(({ _id: __id }) => __id === _id)))
                        : s.filter(({ _id }) => !_?.find(({ _id: __id }) => __id === _id)),
                    );
                  }}
                />
                <div className="Search">
                  <Field
                    sm
                    type="text"
                    noMargin
                    suffix={<CiSearch className="icon" />}
                    placeholder="Search permissions"
                    onChange={({ target: { value } }) => {
                      setSearchPerm({ group, permission: value });
                    }}
                  />
                </div>
              </PermissionListHead>
              <Grid
                xs={1}
                sm={2}
                lg={3}
                colGap={30}
                rowGap={20}
                css={`
                  padding: 15px;
                  overflow-x: hidden;
                  overflow-y: auto;
                  max-height: 500px;
                `}>
                {_.filter(({ can }) =>
                  group.toLowerCase().trim() === searchPerm.group.toLowerCase().trim()
                    ? can.toLowerCase().trim().includes(searchPerm.permission.toLowerCase().trim())
                    : true,
                ).map(({ _id, can }) => (
                  <GridCol key={_id}>
                    <Field
                      noMargin
                      type="checkbox"
                      label={can}
                      name={_id}
                      labelColor="#000"
                      value={!!state.find(c => c._id === _id)}
                      onChange={({ target: { value } }) => {
                        setState(__ => (value ? [...__, { _id, can }] : __.filter(({ _id: __id }) => __id !== _id)));
                      }}
                    />
                  </GridCol>
                ))}
              </Grid>
            </PermissionListGroup>
          ),
        })),
    [state, searchPerm, searchGroup],
  );
  useEffect(() => {
    const selectedPermissions = all_permissions
      .filter(({ _id }) => permissions.includes(_id))
      .map(({ _id, can }) => ({ _id, can }));

    setState(selectedPermissions);
  }, [all_permissions, permissions, isClosed]);
  return (
    <>
      <PermissionListHead topHead>
        <div className="Search">
          <Field
            type="text"
            noMargin
            suffix={<CiSearch className="icon" />}
            placeholder="Search Permission Group"
            onChange={({ target: { value } }) => {
              setSearchGroup(value);
            }}
          />
        </div>
        <div className="switch">
          <Switch
            noMargin
            type="checkbox"
            label="Select All Groups Permissions"
            name="select_all_permissions"
            value={all_permissions.length === state.length}
            onChange={({ target: { value } }) => {
              if (value) {
                setState(all_permissions.map(({ _id, can }) => ({ _id, can })));
              } else {
                setState([]);
              }
            }}
          />
        </div>
      </PermissionListHead>
      <DataTabs data={data} orientation={'vertical'} />

      <Button
        disabled={!state?.length}
        type="primary"
        htmlType="submit"
        onClick={() => {
          onDone(state.map(({ can }) => can));
          onPermClose();
        }}
        css={`
          margin-top: 20px;
        `}>
        Save
      </Button>
    </>
  );
};

export default PermissionSelector;
