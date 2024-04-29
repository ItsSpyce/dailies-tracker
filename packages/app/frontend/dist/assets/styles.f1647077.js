import{u as r}from"./index.334db849.js";const i=r.main`
  display: grid;
  grid-template-columns: auto 1fr;
  margin: 24px;
  height: calc(100% - 48px);
  border: 2px solid ${o=>o.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
`,t=r.div`
  max-width: 400px;
  padding: 24px;
`,d=r.div`
  background-color: ${o=>o.theme.colors.backgroundColored};
  padding: 24px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`,a=r.ul`
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`,l=r.form`
  display: grid;
  grid-template-columns: 3fr 2fr;
`,s=r.div`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  gap: 0.5rem;
`;export{l as ChooseDateForm,a as DailiesList,d as DailiesPanel,s as ExtraRewards,t as StatusPanel,i as StyledApp};
