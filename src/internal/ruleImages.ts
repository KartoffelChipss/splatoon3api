import { RuleID } from '../types/common';

const ruleImg_turfwar = 'https://splatoon3.ink/assets/regular.81d2e9e4.svg';
const ruleImg_rainmaker = 'https://splatoon3.ink/assets/hoko.e3dce940.svg';
const ruleImg_clamblitz = 'https://splatoon3.ink/assets/asari.83043125.svg';
const ruleImg_splatzones = 'https://splatoon3.ink/assets/area.02968ae6.svg';
const ruleImg_towercontrol = 'https://splatoon3.ink/assets/yagura.3d64cf2c.svg';

export function getImageFromRuleId(ruleId: RuleID): string {
    if (ruleId === 'VnNSdWxlLTQ=') return ruleImg_clamblitz;
    if (ruleId === 'VnNSdWxlLTI=') return ruleImg_towercontrol;
    if (ruleId === 'VnNSdWxlLTE=') return ruleImg_splatzones;
    if (ruleId === 'VnNSdWxlLTM=') return ruleImg_rainmaker;
    return ruleImg_turfwar;
}
