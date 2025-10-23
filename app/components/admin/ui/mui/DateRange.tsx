// "use client";
// import React, { useCallback, useEffect, useState, useRef } from "react";
// import { DateRangePicker } from "materialui-daterange-picker";
// import { dateFormatDays } from "@/lib/admin/utils/dayjs";
// import { Box } from "@mui/material";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// export interface DateRangeValue {
//   startDate: string;
//   endDate: string;
// }

// export interface DateRangeValueDate {
//   startDate: Date;
//   endDate: Date;
// }

// export interface DateRangeOption {
//   label: string;
//   value: string;
//   days?: number;
// }

// export interface DateDropdownProps {
//   options?: DateRangeOption[];
//   selectedValue?: string;
//   onChange?: (dateRange?: DateRangeValue | null) => void;
//   className?: string;
//   minDate?: Date;
//   maxDate?: Date;
//   initialRange?: DateRangeValueDate;
//   label?: string;
// }

// const defaultOptions: DateRangeOption[] = [
//   { label: "Today", value: "today", days: 1 },
//   { label: "This Week", value: "this-week", days: 7 },
//   { label: "Last 7 Days", value: "7d", days: 7 },
//   { label: "This Month", value: "this-month", days: 30 },
//   { label: "Last Month", value: "last-month", days: 30 },
//   { label: "Year to Date", value: "ytd", days: 365 },
//   { label: "Custom Range", value: "custom" },
// ];

// export const DateDropdown: React.FC<DateDropdownProps> = ({
//   options = defaultOptions,
//   selectedValue = "7d",
//   onChange,
//   className = "",
//   minDate,
//   maxDate = new Date(),
//   initialRange,
//   label = "Select date range",
// }) => {
//   const [dateRange, setDateRange] = useState<DateRangeValueDate | null>(
//     initialRange || null
//   );
//   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [currentSelectedValue, setCurrentSelectedValue] =
//     useState<string>(selectedValue);
//   const [previousSelectedValue, setPreviousSelectedValue] =
//     useState<string>(selectedValue);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [isOverflowing, setIsOverflowing] = useState(false);
//   const textRef = useRef<HTMLSpanElement>(null);

//   // Check if text is overflowing
//   useEffect(() => {
//     if (textRef.current) {
//       const element = textRef.current;
//       setIsOverflowing(element.scrollWidth > element.clientWidth);
//     }
//   }, [currentSelectedValue, dateRange]);

//   // Handle date range change
//   useEffect(() => {
//     if (
//       dateRange?.startDate &&
//       dateRange?.endDate &&
//       currentSelectedValue === "custom"
//     ) {
//       const formattedRange: DateRangeValue = {
//         startDate: dateFormatDays(dateRange.startDate, "YYYY-MM-DD"),
//         endDate: dateFormatDays(dateRange.endDate, "YYYY-MM-DD"),
//       };
//       const selectedOption = options.find((opt) => opt.value === "custom");
//       onChange?.(formattedRange);
//     }
//     if (!dateRange) {
//       handleOptionSelect(currentSelectedValue);
//     }
//   }, [dateRange, currentSelectedValue, onChange, options]);
//   console.log("daterange dropdown", dateRange);
//   const handleOptionSelect = (value: string) => {
//     if (value === "custom") {
//       setPreviousSelectedValue(currentSelectedValue);
//       setIsDatePickerOpen(true);
//       setIsDropdownOpen(false);
//       return;
//     }

//     setCurrentSelectedValue(value);
//     setIsDropdownOpen(false);
//     const selectedOption = options.find((opt) => opt.value === value);

//     // Calculate date range for predefined options
//     let newDateRange: DateRangeValue | null = null;
//     if (selectedOption?.days && value !== "custom") {
//       const endDate = new Date();
//       const startDate = new Date();
//       startDate.setDate(endDate.getDate() - selectedOption.days);

//       newDateRange = {
//         startDate: dateFormatDays(startDate, "YYYY-MM-DD"),
//         endDate: dateFormatDays(endDate, "YYYY-MM-DD"),
//       };
//       setDateRange({ startDate, endDate });
//     } else {
//       setDateRange(null);
//     }

//     onChange?.(newDateRange);
//   };

//   const handleDateRangeSelect = (range: DateRangeValueDate) => {
//     if (range.startDate && range.endDate) {
//       // Custom range properly selected
//       setDateRange(range);
//       setCurrentSelectedValue("custom");

//       const selectedOption = options.find((opt) => opt.value === "custom");
//       const formattedRange: DateRangeValue = {
//         startDate: dateFormatDays(range.startDate, "YYYY-MM-DD"),
//         endDate: dateFormatDays(range.endDate, "YYYY-MM-DD"),
//       };

//       onChange?.(formattedRange);
//     } else {
//       // Custom range not properly selected, revert to previous option
//       setCurrentSelectedValue(previousSelectedValue);
//     }

//     setIsDatePickerOpen(false);
//   };

//   const toggleDatePicker = useCallback(
//     (value?: boolean) => {
//       const newValue = value !== undefined ? value : !isDatePickerOpen;
//       setIsDatePickerOpen(newValue);

//       if (
//         !newValue &&
//         currentSelectedValue === "custom" &&
//         (!dateRange?.startDate || !dateRange?.endDate)
//       ) {
//         setCurrentSelectedValue(previousSelectedValue);
//       }
//     },
//     [isDatePickerOpen, currentSelectedValue, dateRange, previousSelectedValue]
//   );

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Display text for dropdown
//   const displayText =
//     currentSelectedValue === "custom" &&
//     dateRange?.startDate &&
//     dateRange?.endDate
//       ? `${dateFormatDays(dateRange.startDate)} - ${dateFormatDays(
//           dateRange.endDate
//         )}`
//       : options.find((opt) => opt.value === currentSelectedValue)?.label ||
//         "Last 7 Days";

//   return (
//     <div className="relative w-full max-w-[200px]">
//       {/* Custom Dropdown Trigger */}
//       <div
//         className={`w-full border border-primary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-primary-0 cursor-pointer ${className}`}
//         onClick={toggleDropdown}
//         onMouseEnter={() => isOverflowing && setShowTooltip(true)}
//         onMouseLeave={() => setShowTooltip(false)}
//       >
//         <div className="flex items-center justify-between min-w-0">
//           <span
//             ref={textRef}
//             className="text-primary-800 truncate flex-1 min-w-0 text-left"
//             title={isOverflowing ? displayText : undefined}
//           >
//             {displayText}
//           </span>
//           <svg
//             className={`w-4 h-4 text-primary-400 transition-transform flex-shrink-0 ml-2 ${
//               isDropdownOpen ? "rotate-180" : ""
//             }`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Tooltip for overflow text */}
//       {showTooltip && isOverflowing && (
//         <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-primary-800 text-primary-0 text-sm rounded-lg shadow-lg z-30 max-w-[300px] break-words">
//           {displayText}
//         </div>
//       )}

//       {/* Dropdown Options */}
//       {isDropdownOpen && (
//         <div className="absolute top-full left-0 right-0 bg-primary-0 rounded-lg shadow-lg border border-primary-200 z-20 max-h-64 overflow-y-auto">
//           <div className="p-2">
//             {options.map((option) => (
//               <div
//                 key={option.value}
//                 className={`px-3 py-2 rounded-md cursor-pointer transition-colors ${
//                   currentSelectedValue === option.value
//                     ? "bg-primary-500 text-primary-0"
//                     : "text-primary-800 hover:bg-primary-100"
//                 }`}
//                 onClick={() => handleOptionSelect(option.value)}
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm whitespace-nowrap">
//                     {option.label}
//                   </span>
//                   {currentSelectedValue === option.value && (
//                     <svg
//                       className="w-4 h-4 ml-2"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Date Picker Modal */}
//       {isDatePickerOpen && (
//         <Box
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
//           onClick={() => toggleDatePicker(false)}
//         >
//           <Box
//             className="bg-primary-0 rounded-lg shadow-xl m-4"
//             onClick={(e: React.MouseEvent) => e.stopPropagation()}
//           >
//             <DateRangePicker
//               open={isDatePickerOpen}
//               toggle={toggleDatePicker}
//               closeOnClickOutside={true}
//               minDate={minDate}
//               maxDate={maxDate}
//               wrapperClassName="shadow-none"
//               initialDateRange={dateRange}
//               onChange={(range: DateRangeValueDate) => {
//                 handleDateRangeSelect(range);
//               }}
//             />
//           </Box>
//         </Box>
//       )}
//     </div>
//   );
// };

// export default DateDropdown;

// "use client";
// import React, { useCallback, useEffect, useState, useRef } from "react";
// import { DateRangePicker } from "materialui-daterange-picker";
// import { dateFormatDays } from "@/lib/admin/utils/dayjs";
// import { Box } from "@mui/material";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// export interface DateRangeValue {
//   startDate: string;
//   endDate: string;
// }

// export interface DateRangeValueDate {
//   startDate: Date;
//   endDate: Date;
// }

// export interface DateRangeOption {
//   label: string;
//   value: string;
//   days?: number;
// }

// export interface DateDropdownProps {
//   options?: DateRangeOption[];
//   selectedValue?: string;
//   onChange?: (dateRange?: DateRangeValue | null) => void;
//   className?: string;
//   minDate?: Date;
//   maxDate?: Date;
//   initialRange?: DateRangeValueDate;
//   label?: string;
//   type?: "year" | "dateRange";
// }

// const defaultOptions: DateRangeOption[] = [
//   { label: "Today", value: "today", days: 1 },
//   { label: "This Week", value: "this-week", days: 7 },
//   { label: "Last 7 Days", value: "7d", days: 7 },
//   { label: "This Month", value: "this-month", days: 30 },
//   { label: "Last Month", value: "last-month", days: 30 },
//   { label: "Year to Date", value: "ytd", days: 365 },
//   { label: "Custom Range", value: "custom" },
// ];

// // Generate year options (current year and previous 10 years)
// const generateYearOptions = (): DateRangeOption[] => {
//   const currentYear = new Date().getFullYear();
//   const years: DateRangeOption[] = [];

//   for (let i = 0; i < 11; i++) {
//     const year = currentYear - i;
//     years.push({
//       label: year.toString(),
//       value: year.toString(),
//     });
//   }

//   return years;
// };

// export const DateDropdown: React.FC<DateDropdownProps> = ({
//   options = defaultOptions,
//   selectedValue = "7d",
//   onChange,
//   className = "",
//   minDate,
//   maxDate = new Date(),
//   initialRange,
//   label = "Select date range",
//   type = "dateRange",
// }) => {
//   const [dateRange, setDateRange] = useState<DateRangeValueDate | null>(
//     initialRange || null
//   );
//   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [currentSelectedValue, setCurrentSelectedValue] =
//     useState<string>(selectedValue);
//   const [previousSelectedValue, setPreviousSelectedValue] =
//     useState<string>(selectedValue);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [isOverflowing, setIsOverflowing] = useState(false);
//   const textRef = useRef<HTMLSpanElement>(null);

//   // Use year options if type is "year", otherwise use provided options
//   const displayOptions = type === "year" ? generateYearOptions() : options;

//   // Check if text is overflowing
//   useEffect(() => {
//     if (textRef.current) {
//       const element = textRef.current;
//       setIsOverflowing(element.scrollWidth > element.clientWidth);
//     }
//   }, [currentSelectedValue, dateRange]);

//   // Handle date range change
//   useEffect(() => {
//     if (
//       dateRange?.startDate &&
//       dateRange?.endDate &&
//       currentSelectedValue === "custom"
//     ) {
//       const formattedRange: DateRangeValue = {
//         startDate: dateFormatDays(dateRange.startDate, "YYYY-MM-DD"),
//         endDate: dateFormatDays(dateRange.endDate, "YYYY-MM-DD"),
//       };
//       const selectedOption = options.find((opt) => opt.value === "custom");
//       onChange?.(formattedRange);
//     }
//     if (!dateRange) {
//       handleOptionSelect(currentSelectedValue);
//     }
//   }, [dateRange, currentSelectedValue, onChange, options]);

//   console.log("daterange dropdown", dateRange);

//   const handleOptionSelect = (value: string) => {
//     if (type === "dateRange" && value === "custom") {
//       setPreviousSelectedValue(currentSelectedValue);
//       setIsDatePickerOpen(true);
//       setIsDropdownOpen(false);
//       return;
//     }

//     setCurrentSelectedValue(value);
//     setIsDropdownOpen(false);

//     if (type === "year") {
//       // Handle year selection - set start date to Jan 1 and end date to Dec 31 of selected year
//       const selectedYear = parseInt(value);
//       const startDate = new Date(selectedYear, 0, 1); // January 1
//       const endDate = new Date(selectedYear, 11, 31); // December 31

//       const newDateRange: DateRangeValue = {
//         startDate: dateFormatDays(startDate, "YYYY-MM-DD"),
//         endDate: dateFormatDays(endDate, "YYYY-MM-DD"),
//       };

//       setDateRange({ startDate, endDate });
//       onChange?.(newDateRange);
//     } else {
//       // Original date range logic
//       const selectedOption = options.find((opt) => opt.value === value);

//       // Calculate date range for predefined options
//       let newDateRange: DateRangeValue | null = null;
//       if (selectedOption?.days && value !== "custom") {
//         const endDate = new Date();
//         const startDate = new Date();
//         startDate.setDate(endDate.getDate() - selectedOption.days);

//         newDateRange = {
//           startDate: dateFormatDays(startDate, "YYYY-MM-DD"),
//           endDate: dateFormatDays(endDate, "YYYY-MM-DD"),
//         };
//         setDateRange({ startDate, endDate });
//       } else {
//         setDateRange(null);
//       }

//       onChange?.(newDateRange);
//     }
//   };

//   const handleDateRangeSelect = (range: DateRangeValueDate) => {
//     if (range.startDate && range.endDate) {
//       // Custom range properly selected
//       setDateRange(range);
//       setCurrentSelectedValue("custom");

//       const selectedOption = options.find((opt) => opt.value === "custom");
//       const formattedRange: DateRangeValue = {
//         startDate: dateFormatDays(range.startDate, "YYYY-MM-DD"),
//         endDate: dateFormatDays(range.endDate, "YYYY-MM-DD"),
//       };

//       onChange?.(formattedRange);
//     } else {
//       // Custom range not properly selected, revert to previous option
//       setCurrentSelectedValue(previousSelectedValue);
//     }

//     setIsDatePickerOpen(false);
//   };

//   const toggleDatePicker = useCallback(
//     (value?: boolean) => {
//       const newValue = value !== undefined ? value : !isDatePickerOpen;
//       setIsDatePickerOpen(newValue);

//       if (
//         !newValue &&
//         currentSelectedValue === "custom" &&
//         (!dateRange?.startDate || !dateRange?.endDate)
//       ) {
//         setCurrentSelectedValue(previousSelectedValue);
//       }
//     },
//     [isDatePickerOpen, currentSelectedValue, dateRange, previousSelectedValue]
//   );

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Display text for dropdown
//   const displayText =
//     type === "year"
//       ? currentSelectedValue
//       : currentSelectedValue === "custom" &&
//         dateRange?.startDate &&
//         dateRange?.endDate
//       ? `${dateFormatDays(dateRange.startDate)} - ${dateFormatDays(
//           dateRange.endDate
//         )}`
//       : options.find((opt) => opt.value === currentSelectedValue)?.label ||
//         "Last 7 Days";

//   return (
//     <div className="relative w-full max-w-[200px]">
//       {/* Custom Dropdown Trigger */}
//       <div
//         className={`w-full border border-primary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-primary-0 cursor-pointer ${className}`}
//         onClick={toggleDropdown}
//         onMouseEnter={() => isOverflowing && setShowTooltip(true)}
//         onMouseLeave={() => setShowTooltip(false)}
//       >
//         <div className="flex items-center justify-between min-w-0">
//           <span
//             ref={textRef}
//             className="text-primary-800 truncate flex-1 min-w-0 text-left"
//             title={isOverflowing ? displayText : undefined}
//           >
//             {displayText}
//           </span>
//           <svg
//             className={`w-4 h-4 text-primary-400 transition-transform flex-shrink-0 ml-2 ${
//               isDropdownOpen ? "rotate-180" : ""
//             }`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Tooltip for overflow text */}
//       {showTooltip && isOverflowing && (
//         <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-primary-800 text-primary-0 text-sm rounded-lg shadow-lg z-30 max-w-[300px] break-words">
//           {displayText}
//         </div>
//       )}

//       {/* Dropdown Options */}
//       {isDropdownOpen && (
//         <div className="absolute top-full left-0 right-0 bg-primary-0 rounded-lg shadow-lg border border-primary-200 z-20 max-h-64 overflow-y-auto">
//           <div className="p-2">
//             {displayOptions.map((option) => (
//               <div
//                 key={option.value}
//                 className={`px-3 py-2 rounded-md cursor-pointer transition-colors ${
//                   currentSelectedValue === option.value
//                     ? "bg-primary-500 text-primary-0"
//                     : "text-primary-800 hover:bg-primary-100"
//                 }`}
//                 onClick={() => handleOptionSelect(option.value)}
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm whitespace-nowrap">
//                     {option.label}
//                   </span>
//                   {currentSelectedValue === option.value && (
//                     <svg
//                       className="w-4 h-4 ml-2"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Date Picker Modal - Only show for dateRange type */}
//       {isDatePickerOpen && type === "dateRange" && (
//         <Box
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
//           onClick={() => toggleDatePicker(false)}
//         >
//           <Box
//             className="bg-primary-0 rounded-lg shadow-xl m-4"
//             onClick={(e: React.MouseEvent) => e.stopPropagation()}
//           >
//             <DateRangePicker
//               open={isDatePickerOpen}
//               toggle={toggleDatePicker}
//               closeOnClickOutside={true}
//               minDate={minDate}
//               maxDate={maxDate}
//               wrapperClassName="shadow-none"
//               initialDateRange={dateRange}
//               onChange={(range: DateRangeValueDate) => {
//                 handleDateRangeSelect(range);
//               }}
//             />
//           </Box>
//         </Box>
//       )}
//     </div>
//   );
// };

// export default DateDropdown;

// "use client";
// import React, {
//   useCallback,
//   useEffect,
//   useState,
//   useRef,
//   useMemo,
// } from "react";
// import { DateRangePicker } from "materialui-daterange-picker";
// import { dateFormatDays } from "@/lib/admin/utils/dayjs";
// import { Box } from "@mui/material";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// export interface DateRangeValue {
//   startDate: string;
//   endDate: string;
// }

// export interface DateRangeValueDate {
//   startDate: Date;
//   endDate: Date;
// }

// export interface DateRangeOption {
//   label: string;
//   value: string;
//   days?: number;
// }

// export interface DateDropdownProps {
//   options?: DateRangeOption[];
//   selectedValue?: string;
//   onChange?: (dateRange: DateRangeValue) => void;
//   className?: string;
//   minDate?: Date;
//   maxDate?: Date;
//   initialRange?: DateRangeValueDate;
//   label?: string;
//   type?: "year" | "dateRange";
//   minYear?: number;
//   maxYear?: number;
// }

// const defaultOptions: DateRangeOption[] = [
//   { label: "Today", value: "today", days: 1 },
//   { label: "This Week", value: "this-week", days: 7 },
//   { label: "Last 7 Days", value: "7d", days: 7 },
//   { label: "This Month", value: "this-month", days: 30 },
//   { label: "Last Month", value: "last-month", days: 30 },
//   { label: "Year to Date", value: "ytd", days: 365 },
//   { label: "Custom Range", value: "custom" },
// ];

// // Memoized year options generator
// const useYearOptions = (minYear?: number, maxYear?: number) => {
//   return useMemo(() => {
//     const currentYear = new Date().getFullYear();
//     const startYear = minYear ?? currentYear - 10;
//     const endYear = maxYear ?? currentYear;

//     const years: DateRangeOption[] = [];

//     for (let year = endYear; year >= startYear; year--) {
//       years.push({
//         label: year.toString(),
//         value: year.toString(),
//       });
//     }

//     return years;
//   }, [minYear, maxYear]);
// };

// export const DateDropdown: React.FC<DateDropdownProps> = ({
//   options = defaultOptions,
//   selectedValue = "7d",
//   onChange,
//   className = "",
//   minDate,
//   maxDate = new Date(),
//   initialRange,
//   label = "Select date range",
//   type = "dateRange",
//   minYear,
//   maxYear,
// }) => {
//   const [dateRange, setDateRange] = useState<DateRangeValueDate | null>(
//     initialRange || null
//   );
//   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [currentSelectedValue, setCurrentSelectedValue] =
//     useState<string>(selectedValue);
//   const [previousSelectedValue, setPreviousSelectedValue] =
//     useState<string>(selectedValue);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [isOverflowing, setIsOverflowing] = useState(false);
//   const textRef = useRef<HTMLSpanElement>(null);

//   // Memoized options based on type
//   const yearOptions = useYearOptions(minYear, maxYear);
//   const displayOptions = useMemo(
//     () => (type === "year" ? yearOptions : options),
//     [type, yearOptions, options]
//   );

//   // Check if text is overflowing
//   useEffect(() => {
//     if (textRef.current) {
//       const element = textRef.current;
//       setIsOverflowing(element.scrollWidth > element.clientWidth);
//     }
//   }, [currentSelectedValue, dateRange]);

//   // Memoized handler for option selection
//   const handleOptionSelect = useCallback(
//     (value: string) => {
//       if (type === "dateRange" && value === "custom") {
//         setPreviousSelectedValue(currentSelectedValue);
//         setIsDatePickerOpen(true);
//         setIsDropdownOpen(false);
//         return;
//       }

//       setCurrentSelectedValue(value);
//       setIsDropdownOpen(false);

//       if (type === "year") {
//         // Handle year selection - set start date to Jan 1 and end date to Dec 31 of selected year
//         const selectedYear = parseInt(value);
//         const startDate = new Date(selectedYear, 0, 1); // January 1
//         const endDate = new Date(selectedYear, 11, 31); // December 31

//         const newDateRange: DateRangeValue = {
//           startDate: dateFormatDays(startDate, "YYYY-MM-DD"),
//           endDate: dateFormatDays(endDate, "YYYY-MM-DD"),
//         };

//         setDateRange({ startDate, endDate });
//         onChange?.(newDateRange);
//       } else {
//         // Original date range logic
//         const selectedOption = options.find((opt) => opt.value === value);

//         // Calculate date range for predefined options
//         let newDateRange: DateRangeValue | null = null;
//         if (selectedOption?.days && value !== "custom") {
//           const endDate = new Date();
//           const startDate = new Date();
//           startDate.setDate(endDate.getDate() - selectedOption.days);

//           newDateRange = {
//             startDate: dateFormatDays(startDate, "YYYY-MM-DD"),
//             endDate: dateFormatDays(endDate, "YYYY-MM-DD"),
//           };
//           setDateRange({ startDate, endDate });
//           onChange?.(newDateRange);
//         } else {
//           setDateRange(null);
//         }
//       }
//     },
//     [type, currentSelectedValue, onChange, options]
//   );

//   // Memoized handler for date range selection
//   const handleDateRangeSelect = useCallback(
//     (range: DateRangeValueDate) => {
//       if (range.startDate && range.endDate) {
//         // Custom range properly selected
//         setDateRange(range);
//         setCurrentSelectedValue("custom");

//         const formattedRange: DateRangeValue = {
//           startDate: dateFormatDays(range.startDate, "YYYY-MM-DD"),
//           endDate: dateFormatDays(range.endDate, "YYYY-MM-DD"),
//         };

//         onChange?.(formattedRange);
//       } else {
//         // Custom range not properly selected, revert to previous option
//         setCurrentSelectedValue(previousSelectedValue);
//       }

//       setIsDatePickerOpen(false);
//     },
//     [onChange, previousSelectedValue]
//   );

//   // Handle date range change effect
//   useEffect(() => {
//     if (
//       dateRange?.startDate &&
//       dateRange?.endDate &&
//       currentSelectedValue === "custom"
//     ) {
//       const formattedRange: DateRangeValue = {
//         startDate: dateFormatDays(dateRange.startDate, "YYYY-MM-DD"),
//         endDate: dateFormatDays(dateRange.endDate, "YYYY-MM-DD"),
//       };
//       onChange?.(formattedRange);
//     }
//     if (!dateRange) {
//       handleOptionSelect(currentSelectedValue);
//     }
//   }, [dateRange, currentSelectedValue, onChange, handleOptionSelect]);

//   console.log("daterange dropdown", dateRange);

//   // Memoized toggle functions
//   const toggleDatePicker = useCallback(
//     (value?: boolean) => {
//       const newValue = value !== undefined ? value : !isDatePickerOpen;
//       setIsDatePickerOpen(newValue);

//       if (
//         !newValue &&
//         currentSelectedValue === "custom" &&
//         (!dateRange?.startDate || !dateRange?.endDate)
//       ) {
//         setCurrentSelectedValue(previousSelectedValue);
//       }
//     },
//     [isDatePickerOpen, currentSelectedValue, dateRange, previousSelectedValue]
//   );

//   const toggleDropdown = useCallback(() => {
//     setIsDropdownOpen((prev) => !prev);
//   }, []);

//   // Memoized display text
//   const displayText = useMemo(() => {
//     if (type === "year") {
//       return currentSelectedValue;
//     }

//     if (
//       currentSelectedValue === "custom" &&
//       dateRange?.startDate &&
//       dateRange?.endDate
//     ) {
//       return `${dateFormatDays(dateRange.startDate)} - ${dateFormatDays(
//         dateRange.endDate
//       )}`;
//     }

//     return (
//       options.find((opt) => opt.value === currentSelectedValue)?.label ||
//       "Last 7 Days"
//     );
//   }, [type, currentSelectedValue, dateRange, options]);

//   // Memoized tooltip handlers
//   const handleMouseEnter = useCallback(() => {
//     if (isOverflowing) setShowTooltip(true);
//   }, [isOverflowing]);

//   const handleMouseLeave = useCallback(() => {
//     setShowTooltip(false);
//   }, []);

//   // Memoized dropdown options render
//   const dropdownOptions = useMemo(
//     () =>
//       displayOptions.map((option) => (
//         <div
//           key={option.value}
//           className={`px-3 py-2 rounded-md cursor-pointer transition-colors ${
//             currentSelectedValue === option.value
//               ? "bg-primary-500 text-primary-0"
//               : "text-primary-800 hover:bg-primary-100"
//           }`}
//           onClick={() => handleOptionSelect(option.value)}
//         >
//           <div className="flex items-center justify-between">
//             <span className="text-sm whitespace-nowrap">{option.label}</span>
//             {currentSelectedValue === option.value && (
//               <svg
//                 className="w-4 h-4 ml-2"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             )}
//           </div>
//         </div>
//       )),
//     [displayOptions, currentSelectedValue, handleOptionSelect]
//   );

//   return (
//     <div className="relative w-full max-w-[200px]">
//       {/* Custom Dropdown Trigger */}
//       <div
//         className={`w-full border border-primary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-primary-0 cursor-pointer ${className}`}
//         onClick={toggleDropdown}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div className="flex items-center justify-between min-w-0">
//           <span
//             ref={textRef}
//             className="text-primary-800 truncate flex-1 min-w-0 text-left"
//             title={isOverflowing ? displayText : undefined}
//           >
//             {displayText}
//           </span>
//           <svg
//             className={`w-4 h-4 text-primary-400 transition-transform flex-shrink-0 ml-2 ${
//               isDropdownOpen ? "rotate-180" : ""
//             }`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Tooltip for overflow text */}
//       {showTooltip && isOverflowing && (
//         <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-primary-800 text-primary-0 text-sm rounded-lg shadow-lg z-30 max-w-[300px] break-words">
//           {displayText}
//         </div>
//       )}

//       {/* Dropdown Options */}
//       {isDropdownOpen && (
//         <div className="absolute top-full left-0 right-0 bg-primary-0 rounded-lg shadow-lg border border-primary-200 z-20 max-h-64 overflow-y-auto">
//           <div className="p-2">{dropdownOptions}</div>
//         </div>
//       )}

//       {/* Date Picker Modal - Only show for dateRange type */}
//       {isDatePickerOpen && type === "dateRange" && (
//         <Box
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
//           onClick={() => toggleDatePicker(false)}
//         >
//           <Box
//             className="bg-primary-0 rounded-lg shadow-xl m-4"
//             onClick={(e: React.MouseEvent) => e.stopPropagation()}
//           >
//             <DateRangePicker
//               open={isDatePickerOpen}
//               toggle={toggleDatePicker}
//               closeOnClickOutside={true}
//               minDate={minDate}
//               maxDate={maxDate}
//               wrapperClassName="shadow-none"
//               initialDateRange={dateRange}
//               onChange={handleDateRangeSelect}
//             />
//           </Box>
//         </Box>
//       )}
//     </div>
//   );
// };

// export default DateDropdown;

"use client";
import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import { DateRangePicker } from "materialui-daterange-picker";
import { dateFormatDays } from "@/lib/admin/utils/dayjs";
import { Box } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export interface DateRangeValue {
  startDate: string;
  endDate: string;
}

export interface DateRangeValueDate {
  startDate: Date;
  endDate: Date;
}

export interface DateRangeOption {
  label: string;
  value: string;
  days?: number;
}

export interface DateDropdownProps {
  options?: DateRangeOption[];
  selectedValue?: string;
  onChange?: (dateRange: DateRangeValue) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  initialRange?: DateRangeValueDate;
  label?: string;
  type?: "year" | "dateRange";
  minYear?: number;
  maxYear?: number;
}

const defaultOptions: DateRangeOption[] = [
  { label: "Today", value: "today", days: 1 },
  { label: "This Week", value: "this-week", days: 7 },
  { label: "Last 7 Days", value: "7d", days: 7 },
  { label: "This Month", value: "this-month", days: 30 },
  { label: "Last Month", value: "last-month", days: 30 },
  { label: "Year to Date", value: "ytd", days: 365 },
  { label: "Custom Range", value: "custom" },
];

// Memoized year options generator
const useYearOptions = (minYear?: number, maxYear?: number) => {
  return useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = minYear ?? currentYear - 10;
    const endYear = maxYear ?? currentYear;

    const years: DateRangeOption[] = [];

    for (let year = endYear; year >= startYear; year--) {
      years.push({
        label: year.toString(),
        value: year.toString(),
      });
    }

    return years;
  }, [minYear, maxYear]);
};

export const DateDropdown: React.FC<DateDropdownProps> = ({
  options = defaultOptions,
  selectedValue = "7d",
  onChange,
  className = "",
  minDate,
  maxDate = new Date(),
  initialRange,
  label = "Select date range",
  type = "dateRange",
  minYear,
  maxYear,
}) => {
  // Get current year for year type default
  const currentYear = new Date().getFullYear().toString();

  // Set default value based on type
  const getDefaultSelectedValue = () => {
    if (type === "year") {
      return maxYear ? maxYear.toString() : currentYear;
    }
    return selectedValue;
  };

  const [dateRange, setDateRange] = useState<DateRangeValueDate | null>(
    initialRange || null
  );
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSelectedValue, setCurrentSelectedValue] = useState<string>(
    getDefaultSelectedValue()
  );
  const [previousSelectedValue, setPreviousSelectedValue] = useState<string>(
    getDefaultSelectedValue()
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  // Memoized options based on type
  const yearOptions = useYearOptions(minYear, maxYear);
  const displayOptions = useMemo(
    () => (type === "year" ? yearOptions : options),
    [type, yearOptions, options]
  );

  // Check if text is overflowing
  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      setIsOverflowing(element.scrollWidth > element.clientWidth);
    }
  }, [currentSelectedValue, dateRange]);

  // Initialize default date range based on type
  useEffect(() => {
    if (type === "year") {
      const selectedYear = parseInt(currentSelectedValue);
      const startDate = new Date(selectedYear, 0, 1);
      const endDate = new Date(selectedYear, 11, 31);

      const newDateRange: DateRangeValue = {
        startDate: dateFormatDays(startDate, "YYYY-MM-DD"),
        endDate: dateFormatDays(endDate, "YYYY-MM-DD"),
      };

      setDateRange({ startDate, endDate });
      onChange?.(newDateRange);
    }
    // For dateRange type, the existing logic in handleOptionSelect will handle initialization
  }, [type, currentSelectedValue, onChange]);

  // Memoized handler for option selection
  const handleOptionSelect = useCallback(
    (value: string) => {
      if (type === "dateRange" && value === "custom") {
        setPreviousSelectedValue(currentSelectedValue);
        setIsDatePickerOpen(true);
        setIsDropdownOpen(false);
        return;
      }

      setCurrentSelectedValue(value);
      setIsDropdownOpen(false);

      if (type === "year") {
        // Handle year selection - set start date to Jan 1 and end date to Dec 31 of selected year
        const selectedYear = parseInt(value);
        const startDate = new Date(selectedYear, 0, 1); // January 1
        const endDate = new Date(selectedYear, 11, 31); // December 31

        const newDateRange: DateRangeValue = {
          startDate: dateFormatDays(startDate, "YYYY-MM-DD"),
          endDate: dateFormatDays(endDate, "YYYY-MM-DD"),
        };

        setDateRange({ startDate, endDate });
        onChange?.(newDateRange);
      } else {
        // Original date range logic
        const selectedOption = options.find((opt) => opt.value === value);

        // Calculate date range for predefined options
        let newDateRange: DateRangeValue | null = null;
        if (selectedOption?.days && value !== "custom") {
          const endDate = new Date();
          const startDate = new Date();
          startDate.setDate(endDate.getDate() - selectedOption.days);

          newDateRange = {
            startDate: dateFormatDays(startDate, "YYYY-MM-DD"),
            endDate: dateFormatDays(endDate, "YYYY-MM-DD"),
          };
          setDateRange({ startDate, endDate });
        } else {
          setDateRange(null);
        }
        if (newDateRange) {
          onChange?.(newDateRange);
        }
      }
    },
    [type, currentSelectedValue, onChange, options]
  );

  // Memoized handler for date range selection
  const handleDateRangeSelect = useCallback(
    (range: DateRangeValueDate) => {
      if (range.startDate && range.endDate) {
        // Custom range properly selected
        setDateRange(range);
        setCurrentSelectedValue("custom");

        const formattedRange: DateRangeValue = {
          startDate: dateFormatDays(range.startDate, "YYYY-MM-DD"),
          endDate: dateFormatDays(range.endDate, "YYYY-MM-DD"),
        };

        onChange?.(formattedRange);
      } else {
        // Custom range not properly selected, revert to previous option
        setCurrentSelectedValue(previousSelectedValue);
      }

      setIsDatePickerOpen(false);
    },
    [onChange, previousSelectedValue]
  );

  console.log("daterange dropdown", dateRange);

  // Memoized toggle functions
  const toggleDatePicker = useCallback(
    (value?: boolean) => {
      const newValue = value !== undefined ? value : !isDatePickerOpen;
      setIsDatePickerOpen(newValue);

      if (
        !newValue &&
        currentSelectedValue === "custom" &&
        (!dateRange?.startDate || !dateRange?.endDate)
      ) {
        setCurrentSelectedValue(previousSelectedValue);
      }
    },
    [isDatePickerOpen, currentSelectedValue, dateRange, previousSelectedValue]
  );

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  // Memoized display text
  const displayText = useMemo(() => {
    if (type === "year") {
      return currentSelectedValue;
    }

    if (
      currentSelectedValue === "custom" &&
      dateRange?.startDate &&
      dateRange?.endDate
    ) {
      return `${dateFormatDays(dateRange.startDate)} - ${dateFormatDays(
        dateRange.endDate
      )}`;
    }

    return (
      options.find((opt) => opt.value === currentSelectedValue)?.label ||
      "Last 7 Days"
    );
  }, [type, currentSelectedValue, dateRange, options]);

  // Memoized tooltip handlers
  const handleMouseEnter = useCallback(() => {
    if (isOverflowing) setShowTooltip(true);
  }, [isOverflowing]);

  const handleMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, []);

  // Memoized dropdown options render
  const dropdownOptions = useMemo(
    () =>
      displayOptions.map((option) => (
        <div
          key={option.value}
          className={`px-3 py-2 rounded-md cursor-pointer transition-colors ${
            currentSelectedValue === option.value
              ? "bg-primary-500 text-primary-0"
              : "text-primary-800 hover:bg-primary-100"
          }`}
          onClick={() => handleOptionSelect(option.value)}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm whitespace-nowrap">{option.label}</span>
            {currentSelectedValue === option.value && (
              <svg
                className="w-4 h-4 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
      )),
    [displayOptions, currentSelectedValue, handleOptionSelect]
  );

  return (
    <div className="relative w-full max-w-[200px]">
      {/* Custom Dropdown Trigger */}
      <div
        className={`w-full border border-primary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-primary-0 cursor-pointer ${className}`}
        onClick={toggleDropdown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-between min-w-0">
          <span
            ref={textRef}
            className="text-primary-800 truncate flex-1 min-w-[140px] text-left"
            title={isOverflowing ? displayText : undefined}
          >
            {displayText}
          </span>
          <svg
            className={`w-4 h-4 text-primary-400 transition-transform flex-shrink-0 ml-2 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Tooltip for overflow text */}
      {showTooltip && isOverflowing && (
        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-primary-800 text-primary-0 text-sm rounded-lg shadow-lg z-30 max-w-[300px] break-words">
          {displayText}
        </div>
      )}

      {/* Dropdown Options */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 bg-primary-0 rounded-lg shadow-lg border border-primary-200 z-20 max-h-64 overflow-y-auto">
          <div className="p-2">{dropdownOptions}</div>
        </div>
      )}

      {/* Date Picker Modal - Only show for dateRange type */}
      {isDatePickerOpen && type === "dateRange" && (
        <Box
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
          onClick={() => toggleDatePicker(false)}
        >
          <Box
            className="bg-primary-0 rounded-lg shadow-xl m-4"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <DateRangePicker
              open={isDatePickerOpen}
              toggle={toggleDatePicker}
              closeOnClickOutside={true}
              minDate={minDate}
              maxDate={maxDate}
              wrapperClassName="shadow-none"
              initialDateRange={dateRange}
              onChange={handleDateRangeSelect}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default DateDropdown;
