import ga4 from "react-ga4";

type Category = 'campaign' |'page_view' | 'user_interaction' | 'form_submission' | 'error';

export const logEvent = ({ category, action, label } : { category: Category, action: string, label: string }) => {
  ga4.event({
    category,
    action,
    label,
  })
}