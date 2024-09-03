import { Menu, ActionIcon } from "@mantine/core";
import { IconSettings, IconInfoCircle, IconTrash } from "@tabler/icons-react";

import { TableActionsProps } from "../Table";

// Определяем типы пропсов с учетом generic T
type Props<T> = {
  actions: TableActionsProps;
  element?: T;
};

export const ElementActions = <T,>({
  actions: { onEdit, onDelete, onInfo },
  element,
}: Props<T>) => {
  if (!onEdit && !onInfo && !onDelete) return null;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon>
          <IconSettings size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Дії</Menu.Label>
        {onEdit && element && (
          <Menu.Item
            leftSection={<IconSettings size={14} />}
            onClick={() => onEdit(element as T)}
          >
            Редагувати
          </Menu.Item>
        )}
        {onInfo && element && (
          <Menu.Item
            leftSection={<IconInfoCircle size={14} />}
            onClick={() => onInfo(element)}
          >
            Інформація
          </Menu.Item>
        )}

        {onDelete && element && (
          <>
            <Menu.Divider />
            <Menu.Label>Зона ризику</Menu.Label>
            <Menu.Item
              color="red"
              leftSection={<IconTrash size={14} />}
              onClick={() => onDelete(element)}
            >
              Видалити
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
