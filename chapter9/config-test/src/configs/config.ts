import common from './common';
import local from './local';
import dev from './dev';
import prod from './prod';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const phase = process.env.NODE_ENV; // phase에 NODE_ENV값 저장

let conf = {}; // phase의 값에 따라서 적절한 환경 변숫값을 conf에 저장
if (phase === 'local') {
    conf = local;
} else if (phase === 'dev') {
    conf = dev;
} else if (phase === 'prod') {
    conf = prod;
}

const yamlConfig = yaml.load( // YAML 파일 로딩
    readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf8'),
) as Record<string, any>;

// common과 conf에서 받은 값을 합쳐서 결괏값으로 주는 함수 반환
export default () => ({
   ...yamlConfig, // 기존 설정이 마지막에 덧붙임
   ...common,
   ...conf,
});