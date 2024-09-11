import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { Button, Dropdown, Menu, Spacer } from 'src/components/shared';
import { uniqueId } from 'lodash';
import { BulkActionIconButton } from './styles';

const GridBulkActions = ({ selectedRows, bulkActions, onBulkAction }) => {
  const uniqueKey = uniqueId('grid-bulk-actions-');

  return (
    <>
      <Box display="flex" alignItems="center" height={48}>
        <Box>
          <Typography color="textSecondary" variant="body2">
            {selectedRows.data.length} selected
          </Typography>
        </Box>
        <Spacer x={1} y={1} />
        {bulkActions.map((action, index) => {
          return (
            <Box key={`${uniqueKey}-${index}`} mr={1}>
              {action.icon && !action.title ? (
                <>
                  {action?.tip && action?.tip !== '' ? (
                    <Tooltip title={action.tip}>
                      <div>
                        <BulkActionIconButton
                          onClick={() => {
                            onBulkAction(action.key);
                          }}
                          color="secondary"
                        >
                          {action.icon}
                        </BulkActionIconButton>
                      </div>
                    </Tooltip>
                  ) : (
                    <BulkActionIconButton
                      onClick={() => {
                        onBulkAction(action.key);
                      }}
                      color="secondary"
                    >
                      {action.icon}
                    </BulkActionIconButton>
                  )}
                </>
              ) : action?.type === 'dropdown' ? (
                <Dropdown
                  title={action?.title || 'Select...'}
                  variant="outlined"
                  custom={false}
                  {...action}
                  onChange={async (value) => {
                    await action?.onChange(value);
                    action?.onClose();
                  }}
                />
              ) : action?.type === 'extra-actions' ? (
                <Tooltip title={action.tip ?? ''}>
                  <Menu
                    options={(action.menuItem ?? [])?.map((action) => {
                      return {
                        onClick: () =>
                          typeof action.onClick === 'function'
                            ? action.onClick()
                            : onBulkAction(action.key),
                        label: action.title,
                      };
                    })}
                    iconButton={true}
                    buttonStyles={{ padding: 0, textTransform: 'none', fontWeight: 'normal' }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title={action.tip ?? ''}>
                  <div>
                    <Button
                      variant="outlined"
                      size="small"
                      color={'secondary'}
                      sx={action?.style}
                      disabled={action.disabled}
                      onClick={() => {
                        typeof action.onClick === 'function'
                          ? action.onClick()
                          : onBulkAction(action.key);
                      }}
                      {...(action.icon && {
                        startIcon: action.icon,
                      })}
                    >
                      {action.title}
                    </Button>
                  </div>
                </Tooltip>
              )}
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default GridBulkActions;
