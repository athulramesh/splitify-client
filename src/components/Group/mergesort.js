import DateField from "./DateField";
import ExpenseDetailsAccordion from "./ExpenseDetailsAccordion";
import Paymenter from "./Paymenter";

export default function mergerSort(expenses, payments) {
  let out = [];
  let i = 0;
  let j = 0;
  let k = 1;
  let onDate = new Date(getOnDate(expenses, payments))
    .toJSON()
    .substring(0, 10);
  out[0] = <DateField onDate={onDate} />;
  while (i < expenses.length && j < payments.length) {
    let eDate = new Date(expenses[i].onDate).toJSON().substring(0, 10);
    let pDate = new Date(payments[j].onDate).toJSON().substring(0, 10);
    if (eDate <= pDate) {
      if (eDate !== onDate) {
        out[k] = <DateField onDate={eDate} />;
        onDate = eDate;
        k++;
      }
      out[k] = (
        <ExpenseDetailsAccordion key={i.groupId} expense={expenses[i]} />
      );
      k += 1;
      i += 1;
    } else {
      if (pDate !== onDate) {
        out[k] = <DateField onDate={pDate} />;
        onDate = pDate;
        k++;
      }
      out[k] = <Paymenter payment={payments[j]} />;
      k += 1;
      j += 1;
    }
  }
  while (i < expenses.length) {
    let eDate = new Date(expenses[i].onDate).toJSON().substring(0, 10);
    if (eDate !== onDate) {
      out[k] = <DateField onDate={eDate} />;
      onDate = eDate;
      k++;
    }
    out[k] = <ExpenseDetailsAccordion key={i.groupId} expense={expenses[i]} />;
    i++;
    k++;
  }
  while (j < payments.length) {
    let pDate = new Date(payments[j].onDate).toJSON().substring(0, 10);
    if (pDate !== onDate) {
      out[k] = <DateField onDate={pDate} />;
      onDate = pDate;
      k++;
    }
    out[k] = <Paymenter payment={payments[j]} />;
    j++;
    k++;
  }
  return out.length > 1 ? out : [];
}
function getOnDate(expenses, payments) {
  if (expenses.length > 0 && payments.length > 0) {
    if (expenses[0].onDate > payments[0].onDate) {
      return payments[0].onDate;
    } else {
      return expenses[0].onDate;
    }
  } else if (expenses.length > 0 && payments.length === 0) {
    return expenses[0].onDate;
  } else if (expenses.length === 0 && payments.length > 0) {
    return payments[0].onDate;
  } else {
    return null;
  }
}
