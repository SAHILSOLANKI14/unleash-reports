import styled from 'styled-components';

export const DateRangeAltWrapper = styled.div`
  .rdrDefinedRangesWrapper {
    display: none;
  }
  .rdrSelected,
  .rdrInRange,
  .rdrStartEdge,
  .rdrEndEdge {
    background: #1976d2 !important;
  }
  .rdrMonthAndYearWrapper {
    background: ${(props) => props.palette.background.default};
  }
  .rdrMonths {
    background: ${(props) => props.palette.background.paper};
    color: ${(props) => props.palette.text.secondary};
  }
  .rdrDay {
    height: 3.6em;
    /* height: 34px; */
  }
  .rdrDayStartPreview {
    top: 4px;
    left: 6px;
    border-top-left-radius: 34px;
    border-bottom-left-radius: 34px;
    width: 41px;
    height: 34px;
    margin: 0 auto;
  }
  .rdrDayInPreview {
    top: 4px;
    height: 34px;
  }
  .rdrInRange {
    height: 34px;
  }
  .rdrDayEndPreview {
    top: 4px;
    left: -5px;
    border-top-right-radius: 34px;
    border-bottom-right-radius: 34px;
    width: 41px;
    height: 34px;
    margin: 0 auto;
  }
  .rdrDayStartPreview.rdrDayEndPreview {
    top: 2px;
    left: 2px;
    border-radius: 34px;
    height: 34px;
    width: 34px;
  }
  .rdrCalendarWrapper:not(.rdrDateRangeWrapper) .rdrDayHovered .rdrDayNumber:after {
    border-radius: 40px;
  }
  .rdrDayDisabled {
    background-color: rgb(0, 0, 0, 0.1);
  }
  .rdrDefinedRangesWrapper {
  }
  .rdrInRange {
    background: #1976d260 !important;
  }
  .rdrStartEdge,
  .rdrEndEdge {
    border-radius: 40px;
    width: 34px;
    height: 34px;
    margin: 0 auto;
  }
  .rdrEndEdge:before {
    position: absolute;
    left: -5px;
    content: '';
    background: #1976d260 !important;
    width: 40px;
    height: 34px;
    display: block;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
  }
  .rdrStartEdge:after {
    position: absolute;
    left: 0px;
    content: '';
    background: #1976d260 !important;
    width: 40px;
    height: 34px;
    display: block;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
  }
  .rdrEndEdge.rdrStartEdge:before,
  .rdrEndEdge.rdrStartEdge:after {
    display: none;
  }
  .rdrDayToday .rdrDayNumber span:after {
    display: none;
  }
  .rdrMonthAndYearPickers select {
    /* color: rgba(0, 0, 0, 0.6); */
    color: ${(props) => props.palette.text.primary};
    font-size: 14px;
    font-weight: 300;
  }
  .rdrNextPrevButton {
    background: ${(props) => props.palette.secondary.main};
  }
  .rdrDayNumber span,
  .rdrCalendarWrapper {
    /* color: rgba(0, 0, 0, 0.87); */
    color: ${(props) => props.palette.text.secondary};
    font-size: 12px;
    font-weight: 400;
  }
  .rdrDayPassive .rdrDayNumber span {
    color: rgba(0, 0, 0, 0.3);
  }
`;
