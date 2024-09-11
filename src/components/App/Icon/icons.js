import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ReactComponent as Billing } from 'src/assets/images/sidebar/billing.svg';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { ReactComponent as Tasks } from 'src/assets/images/sidebar/tasks.svg';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import GroupsIcon from '@mui/icons-material/Groups';
const iconConfig = {
  dashboard: GridViewSharpIcon,
  orders: ShoppingCartIcon,
  appointment: CalendarMonthIcon,
  billing: ReceiptLongIcon,
  purchases: StoreSharpIcon,
  people: GroupsIcon,
  settings: MiscellaneousServicesIcon,
  tasks: ShoppingCartIcon,
  Product: InventoryIcon,
  myaccount: SupervisorAccountIcon,
};

export default iconConfig;
