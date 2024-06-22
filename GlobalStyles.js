import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

export const TextStyles = theme =>
  StyleSheet.create({
    screen_title: { style: { color: theme.colors.strong }, props: {} },
    selected: {
      style: {
        color: { minWidth: Breakpoints.Laptop, value: theme.colors['Primary'] },
      },
      props: {},
    },
  });

export const LinearGradientStyles = theme =>
  StyleSheet.create({ 'Linear Gradient': { style: { flex: 1 }, props: {} } });

export const ImageStyles = theme =>
  StyleSheet.create({
    Image: { style: { height: 100, width: 100 }, props: {} },
  });

export const SurfaceStyles = theme =>
  StyleSheet.create({
    Surface: {
      style: {
        alignContent: 'center',
        alignSelf: 'auto',
        backgroundColor: theme.colors['Surface'],
        borderRadius: 10,
        borderStyle: 'solid',
        margin: 15,
      },
      props: {},
    },
    'Surface 2': { style: {}, props: {} },
  });

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Login Text Style': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.divider,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
    'Text Input': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.divider,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
  });

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      style: {
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
  });

export const LinkStyles = theme =>
  StyleSheet.create({
    Link: { style: { color: theme.colors.primary }, props: {} },
  });

export const HStackStyles = theme =>
  StyleSheet.create({
    'H Stack': {
      style: { alignItems: 'center', flexDirection: 'row' },
      props: {},
    },
  });

export const BottomSheetStyles = theme =>
  StyleSheet.create({
    'Bottom Sheet': {
      style: {
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
      },
      props: {},
    },
  });

export const VStackStyles = theme =>
  StyleSheet.create({
    'V Stack': { style: { flexDirection: 'column' }, props: {} },
  });

export const FetchStyles = theme =>
  StyleSheet.create({ Fetch: { style: { minHeight: 40 }, props: {} } });

export const SquareStyles = theme =>
  StyleSheet.create({
    Square: {
      style: {
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
      },
      props: {},
    },
  });

export const TabViewItemStyles = theme =>
  StyleSheet.create({ 'Tab View Item': { style: { flex: 1 }, props: {} } });

export const H2Styles = theme =>
  StyleSheet.create({
    H2: {
      style: { color: theme.colors.strong, fontSize: 24, fontWeight: 'bold' },
      props: {},
    },
  });

export const ZStackStyles = theme =>
  StyleSheet.create({
    'Z Stack': { style: { flexDirection: 'row' }, props: {} },
  });

export const H3Styles = theme =>
  StyleSheet.create({
    H3: {
      style: {
        color: theme.colors.strong,
        fontSize: 18.72,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const H4Styles = theme =>
  StyleSheet.create({
    H4: {
      style: { color: theme.colors.strong, fontSize: 16, fontWeight: 'bold' },
      props: {},
    },
  });

export const H5Styles = theme =>
  StyleSheet.create({
    H5: {
      style: {
        color: theme.colors.strong,
        fontSize: 13.28,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const ActionSheetItemStyles = theme =>
  StyleSheet.create({
    'Action Sheet Item': { style: { textAlign: 'center' }, props: {} },
  });

export const TableStyles = theme =>
  StyleSheet.create({ Table: { style: { flex: 1 }, props: {} } });

export const TableCellStyles = theme =>
  StyleSheet.create({
    'Table Cell': { style: { flex: 1, flexDirection: 'row' }, props: {} },
  });

export const IconStyles = theme =>
  StyleSheet.create({
    Selected: {
      style: {},
      props: {
        color: theme.colors['Primary'],
      },
    },
  });

export const H6Styles = theme =>
  StyleSheet.create({
    H6: {
      style: {
        color: theme.colors.strong,
        fontSize: 10.72,
        fontWeight: 'bold',
      },
      props: {},
    },
  });
