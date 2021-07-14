// import * as _ from 'lodash';
import { INewOrder } from '../../../interfaces/order.interface';
import { IOrderBill } from '../../../interfaces/orderBill.interface';

export const OrderItemsGenerator = (orderDetails: INewOrder, orderID: string): Array<IOrderBill> => {
  const orderItemList: Array<IOrderBill> = [];
  orderDetails.order.forEach(item => {
    if (item.customizable.length < 1) {
      const itemGenerator = {} as IOrderBill;
      itemGenerator['item_name'] = item.title;
      itemGenerator['item_price'] = item.price;
      itemGenerator['item_quantity'] = item.quantity;
      itemGenerator['orderID'] = orderID;
      itemGenerator['orderStatus'] = orderDetails.orderStatus;
      itemGenerator['placed_by'] = orderDetails['memberID'];
      itemGenerator['item_total'] = orderDetails.orderStatus === 'delivered' ? item.quantity * item.price : null;
      orderItemList.push(itemGenerator);
    } else {
      item.customizable.forEach(itemCustomization => {
        if (itemCustomization.optionQuantity > 0) {
          const itemGenerator = {} as IOrderBill;
          itemGenerator['item_name'] = itemCustomization.optionTitle;
          itemGenerator['item_price'] = itemCustomization.optionPrice;
          itemGenerator['item_quantity'] = itemCustomization.optionQuantity;
          itemGenerator['item_total'] =
            orderDetails.orderStatus === 'delivered'
              ? itemCustomization.optionPrice * itemCustomization.optionQuantity
              : null;
          itemGenerator['orderID'] = orderID;
          itemGenerator['orderStatus'] = orderDetails.orderStatus;
          itemGenerator['placed_by'] = orderDetails.memberID;
          orderItemList.push(itemGenerator);
        }
      });
    }
  });
  return orderItemList;
};
