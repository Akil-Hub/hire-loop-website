"use client";

import { useState, useRef } from "react";
import { Select, Label, ListBox, Button } from "@heroui/react";
import { Search, SlidersHorizontal, X } from "lucide-react";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];


const CATEGORIES = ["Engineering", "Design", "Marketing", "Sales",
 
   "Data", "Other","Cloud Computing",'Mobile Development','DevOps'];




const CURRENCIES = ["USD", "EUR", "GBP", "BDT"];
const REMOTE_OPTIONS = ["Remote", "On-site"];

const JobFilters = ({ onSearch, onFilter }) => {
  const [open, setOpen] = useState(false);
  const [jobType, setJobType] = useState(null);
  const [category, setCategory] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [remote, setRemote] = useState(null);
  const debounceRef = useRef(null);

  const hasActiveFilters = jobType || category || currency || remote;
  const activeFilterCount = [jobType, category, currency, remote].filter(Boolean).length;

  const handleSearch = (e) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch?.(e.target.value);
    }, 400);
  };

  const handleSelect = (key, val, setter) => {
    setter(val);
    onFilter?.({
      jobType: key === "jobType" ? val : jobType,
      category: key === "category" ? val : category,
      currency: key === "currency" ? val : currency,
      remote: key === "remote" ? val : remote,
    });
  };

  const handleClear = () => {
    setJobType(null);
    setCategory(null);
    setCurrency(null);
    setRemote(null);
    onFilter?.({ jobType: null, category: null, currency: null, remote: null });
  };

  const triggerCls = "bg-white/5 border border-white/10 hover:border-violet-500/40 data-[focused=true]:border-violet-500 rounded-xl h-11";
  const popoverCls = "bg-[#1a1a2e] border border-white/10 rounded-xl";
  const itemCls = "text-white/70 data-[selected=true]:text-violet-400 data-[focused=true]:bg-white/5 rounded-lg";

  return (
    <div className="w-full space-y-3">
      {/* Search + toggle row */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 z-10 pointer-events-none" />
          <input
            onChange={handleSearch}
            placeholder="Search by title, company, or keyword..."
            className="w-full h-11 bg-white/5 border border-white/10 hover:border-violet-500/40 focus:border-violet-500 focus:outline-none rounded-xl pl-9 pr-4 text-sm text-white placeholder:text-white/30 transition-colors"
          />
        </div>

        <Button
          onPress={() => setOpen((p) => !p)}
          className={`h-11 px-4 rounded-xl border text-sm font-medium transition-colors flex items-center gap-2 min-w-fit ${open || hasActiveFilters
              ? "bg-violet-500/20 border-violet-500/50 text-violet-300"
              : "bg-white/5 border-white/10 text-white/60 hover:border-violet-500/40 hover:text-white"
            }`}
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-violet-500 text-white text-[10px] flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filter panel */}
      {open && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {/* Job Type */}
            <Select value={jobType} onChange={(val) => handleSelect("jobType", val, setJobType)} placeholder="Any type">
              <Label className="text-white/50 text-xs">Job Type</Label>
              <Select.Trigger className={triggerCls}>
                <Select.Value className="text-white text-sm" />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className={popoverCls}>
                <ListBox>
                  {JOB_TYPES.map((t) => (
                    <ListBox.Item key={t} id={t} textValue={t} className={itemCls}>
                      {t}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Category */}
            <Select value={category} onChange={(val) => handleSelect("category", val, setCategory)} placeholder="Any category">
              <Label className="text-white/50 text-xs">Category</Label>
              <Select.Trigger className={triggerCls}>
                <Select.Value className="text-white text-sm" />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className={popoverCls}>
                <ListBox>
                  {CATEGORIES.map((c) => (
                    <ListBox.Item key={c} id={c} textValue={c} className={itemCls}>
                      {c}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Currency */}
            <Select value={currency} onChange={(val) => handleSelect("currency", val, setCurrency)} placeholder="Any currency">
              <Label className="text-white/50 text-xs">Currency</Label>
              <Select.Trigger className={triggerCls}>
                <Select.Value className="text-white text-sm" />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className={popoverCls}>
                <ListBox>
                  {CURRENCIES.map((c) => (
                    <ListBox.Item key={c} id={c} textValue={c} className={itemCls}>
                      {c}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Work Mode */}
            <Select value={remote} onChange={(val) => handleSelect("remote", val, setRemote)} placeholder="Any mode">
              <Label className="text-white/50 text-xs">Work Mode</Label>
              <Select.Trigger className={triggerCls}>
                <Select.Value className="text-white text-sm" />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className={popoverCls}>
                <ListBox>
                  {REMOTE_OPTIONS.map((o) => (
                    <ListBox.Item key={o} id={o} textValue={o} className={itemCls}>
                      {o}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

          </div>

          {hasActiveFilters && (
            <div className="flex justify-end">
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                <X size={12} />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobFilters;