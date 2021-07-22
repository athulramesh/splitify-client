import ExpenseDetailsAccordion from "./ExpenseDetailsAccordion";
import Paymenter from "./Paymenter";

export default function mergerSort(expenses, payments) {
  let out = [];
  let o = [];
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < expenses.length && j < payments.length) {
    if (expenses[i].onDate <= payments[j].onDate) {
      o[k] = expenses[i];
      out[k] = (
        <ExpenseDetailsAccordion key={i.groupId} expense={expenses[i]} />
      );
      k += 1;
      i += 1;
    } else {
      o[k] = payments[j];
      out[k] = <Paymenter payment={payments[j]} />;
      k += 1;
      j += 1;
    }
  }
  while (i < expenses.length) {
    out[k] = <ExpenseDetailsAccordion key={i.groupId} expense={expenses[i]} />;
    o[k] = expenses[i];
    i++;
    k++;
  }
  while (j < payments.length) {
    o[k] = payments[j];
    out[k] = <Paymenter payment={payments[j]} />;
    j++;
    k++;
  }
  console.log("here is the sort");
  console.log(o);
  return out;
}
